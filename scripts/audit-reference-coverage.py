"""Compare freshly downloaded reference collection HTML with the local card inventory."""
from html.parser import HTMLParser
from pathlib import Path
import json,re
class P(HTMLParser):
 def __init__(self):super().__init__();self.depth=0;self.card=None;self.cards=[];self.skip=0;self.section="";self.photos=[]
 def handle_starttag(self,t,a):
  if t in ['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']:self.on_tag(t,dict(a));return
  self.depth+=1;self.on_tag(t,dict(a))
 def on_tag(self,t,d):
  if t in ['script','style']:self.skip+=1
  if t=='section':self.section=d.get('id','')
  if t=='div' and '__' in d.get('id','') and 'HFEOE3' in d.get('class','') and self.card is None:self.card={'id':d['id'],'texts':[],'links':[],'image':'','depth':self.depth,'section':self.section}
  if not self.card and t=='img' and '/media/' in d.get('src',''):
   self.photos.append({'section':self.section,'image':d['src'].split('/media/')[1].split('/v1/')[0]})
  if self.card:
   if t=='a' and d.get('href'):self.card['links'].append(d['href'])
   if t=='img' and '/media/' in d.get('src','') and not self.card['image']:self.card['image']=d['src'].split('/media/')[1].split('/v1/')[0]
 def handle_startendtag(self,t,a):self.on_tag(t,dict(a))
 def handle_endtag(self,t):
  if t in ['script','style']:self.skip=max(0,self.skip-1)
  if self.card and self.depth==self.card['depth'] and t=='div':self.cards.append(self.card);self.card=None
  self.depth-=1
 def handle_data(self,d):
  if self.card and not self.skip and d.strip():self.card['texts'].append(d.strip())

from collections import Counter
import sys
manifest=json.loads(Path('docs/reference-assets.json').read_text())
asset_map={a['source'].split('/media/')[1].split('/v1/')[0]:a['local'] for a in manifest['assets']}
layouts=json.loads(Path('src/data/collection-layouts.json').read_text())
report={'checkedOn':'2026-11-03','method':'Fresh public collection HTML; compare every repeated card image occurrence with local cards.','categories':{},'missing':[],'extra':[]}
for category in ['chairs','sofas','swings','tables']:
 parser=P();parser.feed(Path('/tmp/vaidehi-current-'+category+'.html').read_text())
 source=[c for c in parser.cards if c['image'] and 'REQUEST QUOTE' in c['texts']]
 if not source:raise RuntimeError('No source cards parsed: '+category)
 expected=Counter(asset_map.get(c['image'],'UNACQUIRED:'+c['image']) for c in source)
 actual=Counter(card['image'] for section in layouts[category]['sections'] for card in section['cards'])
 missing=list((expected-actual).elements());extra=list((actual-expected).elements())
 report['categories'][category]={'referenceCards':len(source),'localCards':sum(actual.values()),'missing':missing,'extra':extra}
 report['missing'] += [{'category':category,'image':image} for image in missing]
 report['extra'] += [{'category':category,'image':image} for image in extra]
report['result']='passed' if not report['missing'] and not report['extra'] else 'failed'
Path('docs/reference-coverage-audit.json').write_text(json.dumps(report,indent=2)+'\n')
for category,info in report['categories'].items():print(category,info)
print('Coverage audit:',report['result'])
sys.exit(0 if report['result']=='passed' else 1)
