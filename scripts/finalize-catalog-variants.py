"""Persist visually verified design/finish distinctions while preserving all repeated-name product cards."""
from pathlib import Path
from copy import deepcopy
import json
products=json.loads(Path('src/data/products.json').read_text())
layouts=json.loads(Path('src/data/collection-layouts.json').read_text())
for p in products:p.update(canonicalPath=p['path'],includeInSitemap=True,variantGroup=None)
by_slug={p['slug']:p for p in products}
# Restore the three cards previously removed, in their original collection positions.
restores=[
 {'category':'chairs','section':2,'position':11,'base':'hawaii-cane-chair','slug':'hawaii-collection-cane-chair','label':'Hawaii Collection','image':'hawaii-cane-chair-01.webp'},
 {'category':'sofas','section':2,'position':0,'base':'filitheyo-cane-sofa','slug':'filitheyo-collection-cane-sofa','label':'Filitheyo Collection','image':'cane-sofas-collection-09.webp'},
 {'category':'tables','section':0,'position':5,'base':'claire-cane-table','slug':'claire-collection-cane-table','label':'Claire Collection','image':'claire-cane-table-02.webp'},
]
for entry in restores:
 layout=layouts[entry['category']]
 if any(c['slug']==entry['slug'] for section in layout['sections'] for c in section['cards']):continue
 section=layout['sections'][entry['section']]
 image='/images/products/'+entry['image']
 if not any(c['slug']==entry['base'] and c['image']==image for c in section['cards']):
  section['cards'].insert(entry['position'], {'slug':entry['base'],'image':image,'label':entry['label']})
configs=[
 {'base':'barcelona-cane-chair','baseName':'Barcelona Cane Armchair','baseLabel':'Barcelona Armchair','slug':'barcelona-armless-cane-chair','name':'Barcelona Armless Cane Chair','label':'Barcelona Armless','image':'cane-chairs-collection-05.webp','finish':False,'sharedDetails':False},
 {'base':'malaga-cane-chair','baseName':'Malaga Teal Cushion Cane Chair','baseLabel':'Malaga · Teal Cushion','slug':'malaga-blue-cushion-cane-chair','name':'Malaga Blue Cushion Cane Chair','label':'Malaga · Blue Cushion','image':'malaga-cane-chair-06.webp','finish':True,'sharedDetails':True,'source':'/chair-2/malaga'},
 {'base':'mileos-cane-chair','baseName':'Mileos Green Finish Cane Chair','baseLabel':'Mileos · Green','slug':'mileos-natural-finish-cane-chair','name':'Mileos Natural Finish Cane Chair','label':'Mileos · Natural','image':'cane-chairs-collection-31.webp','finish':True,'sharedDetails':True},
 {'base':'petra-compact-cane-swing','baseName':'Petra Woven Base Cane Swing','baseLabel':'Petra · Woven Base','slug':'petra-open-frame-cane-swing','name':'Petra Open Frame Cane Swing','label':'Petra · Open Frame','image':'cane-swings-collection-23.webp','finish':False,'sharedDetails':False},
 {'base':'mileos-cane-table','baseName':'Mileos Natural Finish Cane Table','baseLabel':'Mileos · Natural','slug':'mileos-green-finish-cane-table','name':'Mileos Green Finish Cane Table','label':'Mileos · Green','image':'cane-tables-collection-06.webp','finish':True,'sharedDetails':True},
]
for entry in restores:
 base=by_slug[entry['base']]
 name=entry['label']+' Cane '+{'chairs':'Chair','sofas':'Sofa','tables':'Table'}[entry['category']]
 configs.append({'base':entry['base'],'baseName':base['name'],'baseLabel':base['model'],'slug':entry['slug'],'name':name,'label':entry['label'],'image':entry['image'],'finish':True,'sharedDetails':True,'presentation':True})
image_names=json.loads(Path('docs/image-name-map.json').read_text())
source=json.loads(Path('docs/source-catalog-assets.json').read_text())
for c in configs:
 base=by_slug[c['base']];old_name=base['name'];base['name']=c['baseName'];base['description']=base['description'].replace(old_name,c['baseName'],1);base['variantGroup']=base['slug']
 image='/images/products/'+c['image']
 variant=by_slug.get(c['slug'])
 if variant is None:
  variant=deepcopy(base);variant.update(slug=c['slug'],name=c['name'],path=f'/furniture/{base["category"]}/{c["slug"]}',quotePath=f'/request-quote/{c["slug"]}')
  variant['images']=[image]
  if c.get('source'):
   gallery=next(p['images'] for p in source if p['path']==c['source'])
   variant['images']=list(dict.fromkeys([image]+[image_names.get(i,i) for i in gallery]))
  if not c['sharedDetails']:variant['details']=[]
  variant['description']=f'{c["name"]} by Vaidehi Craft. View this {"finish" if c["finish"] else "design"} and request its available options and a tailored quotation.'
  products.append(variant);by_slug[variant['slug']]=variant
 variant.update(variantGroup=base['slug'],canonicalPath=base['path'] if c['finish'] else variant['path'],includeInSitemap=not c['finish'])
 if not c.get('presentation'):base['images']=[img for img in base['images'] if img not in variant['images']]
 if not base['images']:raise RuntimeError('Missing primary design image: '+base['slug'])
 for section in layouts[base['category']]['sections']:
  for card in section['cards']:
   if card['slug']==base['slug']:
    if card['image']==image and (not c.get('presentation') or section['type']!='feature'):card.update(slug=c['slug'],label=c['label'])
    else:card['label']=c['baseLabel']
# Every source card is preserved; repeated names are resolved with explicit variants.
removed=[]
Path('src/data/products.json').write_text(json.dumps(products,indent=2)+'\n')
Path('src/data/product-index.json').write_text(json.dumps([{k:p[k] for k in ['name','slug','path','quotePath','category']} for p in products],indent=2)+'\n')
Path('src/data/collection-layouts.json').write_text(json.dumps(layouts,indent=2)+'\n')
Path('docs/catalog-variant-decisions.json').write_text(json.dumps({'variants':configs,'repeatedCardsRemoved':removed,'policy':'All repeated-name cards are preserved with explicit names and unique URLs. Distinct constructions self-canonicalize; finish/presentation variants use the primary model canonical. No cards are removed.'},indent=2)+'\n')
print(f'{len(products)} products; {sum(len(s["cards"]) for l in layouts.values() for s in l["sections"])} unique cards; {len(removed)} repeated views removed.')
