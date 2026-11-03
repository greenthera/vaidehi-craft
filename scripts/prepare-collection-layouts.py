"""Recover collection presentation and fix mislinked cards using local records only."""
from pathlib import Path
from urllib.parse import urlparse
import json,re,unicodedata
products=json.loads(Path('src/data/products.json').read_text())
source=json.loads(Path('docs/source-collection-cards.json').read_text())
manifest=json.loads(Path('docs/reference-assets.json').read_text())
redirects=json.loads(Path('src/data/legacy-redirects.json').read_text())
asset_map={a['source'].split('/media/')[1].split('/v1/')[0]:a['local'] for a in manifest['assets']}
old_to_new={r['source']:r['destination'] for r in redirects}
def slugify(s):return re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode().lower()).strip('-')
def normalize(s):return slugify(s).replace('roking','rocking')
order={'chairs':['comp-maf8saku','comp-maffnk76','comp-mafblg0s'],'sofas':['comp-madldthp','comp-madm0ecr','comp-madm0gfu'],'swings':['comp-mai0ub5i3','comp-mai4imic','comp-mai479lo','comp-mai4jp2g','comp-mai4bjc2'],'tables':['comp-mai704m6','comp-mai9rvyj','comp-mai9owsw']}
hero={'chairs':'comp-mafbl6ak','sofas':'comp-madlm4f2','swings':'comp-mai4ivwk','tables':'comp-mai6zfuc'}
layouts={};added=[]
for category,data in source.items():
 kind=category[:-1] if category!='chairs' else 'chair'
 cards=[]
 for card in data['cards']:
  name=card['texts'][0].replace('Roking','Rocking').replace('Whit Roof','With Roof').replace('Nbula','Nebula')
  linked=old_to_new.get(urlparse(card['links'][0]).path) if card['links'] else None
  product=next((p for p in products if p['path']==linked),None)
  if category=='chairs' and (not product or normalize(product['model'])!=normalize(name)):
   product=next((p for p in products if p['category']==category and normalize(p['model'])==normalize(name)),None)
  if product is None:
   display=f'{name} Cane {kind.title()}';slug=slugify(display)
   if any(p['slug']==slug for p in products):raise RuntimeError('Slug collision: '+slug)
   product={'name':display,'model':name,'category':category,'slug':slug,'path':f'/furniture/{category}/{slug}','quotePath':f'/request-quote/{slug}','images':[],'details':[],'description':f'{display} by Vaidehi Craft. View the design and request its dimensions, available finishes and a tailored quotation.'}
   products.append(product);added.append(slug)
  image=asset_map[card['image']]
  if image not in product['images']:product['images'].append(image)
  cards.append({'slug':product['slug'],'image':image,'label':name,'section':card['section']})
 photos={photo['section']:asset_map[photo['image']] for photo in data['photos'] if photo['image'] in asset_map}
 sections=[]
 for section in order[category]:
  group=[{k:c[k] for k in ['slug','image','label']} for c in cards if c['section']==section]
  image=photos.get(section)
  if group or image:sections.append({'type':'feature' if image else 'grid','image':image,'cards':group})
 layouts[category]={'poster':photos.get(hero[category],cards[0]['image']),'sections':sections}
Path('src/data/products.json').write_text(json.dumps(products,indent=2)+'\n')
Path('src/data/product-index.json').write_text(json.dumps([{k:p[k] for k in ['name','slug','path','quotePath','category']} for p in products],indent=2)+'\n')
Path('src/data/collection-layouts.json').write_text(json.dumps(layouts,indent=2)+'\n')
record=Path('docs/recovered-collection-products.json')
previous=json.loads(record.read_text())['recoveredProducts'] if record.exists() else []
Path('docs/recovered-collection-products.json').write_text(json.dumps({'recoveredProducts':list(dict.fromkeys(previous+added)),'note':'Distinct designs whose source card incorrectly pointed to Malaga. Details are not copied from the mislinked page.'},indent=2)+'\n')
print(f'Prepared {len(products)} products and {sum(len(c["cards"]) for layout in layouts.values() for c in layout["sections"])} collection cards. Recovered {len(added)} mislinked designs.')
