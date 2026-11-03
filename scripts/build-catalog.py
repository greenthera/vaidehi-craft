"""Build the independent local catalog from already downloaded migration data."""
from pathlib import Path
from html.parser import HTMLParser
import hashlib,json,re,shutil,unicodedata
root=Path('.')
source=Path('docs/source-catalog-assets.json')
if not source.exists():
    shutil.move('src/data/catalog-assets.json',source)
pages=json.loads(source.read_text())
class Text(HTMLParser):
    def __init__(self):super().__init__();self.skip=0;self.parts=[]
    def handle_starttag(self,t,a):
        if t in ('style','script'):self.skip+=1
    def handle_endtag(self,t):
        if t in ('style','script'):self.skip=max(0,self.skip-1)
    def handle_data(self,d):
        if not self.skip and d.strip():self.parts.append(re.sub(r'\s+',' ',d.strip()))
def slugify(s):
    s=unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+','-',s).strip('-')
def sections(path):
    p=Path('/tmp/vaidehi-product-html')/(hashlib.sha256(path.encode()).hexdigest()+'.html')
    parser=Text();parser.feed(p.read_text());parts=parser.parts
    parts=parts[parts.index('Close')+2:parts.index('REQUEST QUOTE')]
    result=[]
    for text in parts:
        bullet=text.lstrip().startswith('•')
        text=text.strip().strip('•').strip()
        if not text:continue
        if not bullet and not text.endswith('.') and len(text)<48 and not re.match(r'^\d',text) and not text.startswith(('Customizable','Fully customizable')) and ('•' not in text):
            result.append({'heading':text.rstrip(' :'),'text':[]})
        elif result:result[-1]['text'].append(text)
    return [s for s in result if s['text']]
category_map={'chair':'chairs','sofa':'sofas','swing':'swings','table':'tables'}
# Same model/size pages are consolidated; color finishes remain one image gallery.
merge={'/chair-2/malaga':'/chair-1/malaga','/sofa-3/filitheyo':'/sofa-2/filitheyo','/table-3/claire':'/table-1/claire'}
variants={
'/swing-1/bora-bora':'Double Seater','/swing-2/bora-bora':'Single Seater',
'/swing-1/petra':'Double Seater','/swing-2/petra':'Compact',
'/swing-1/streak':'Double Seater','/swing-2/streak':'Compact',
'/swing-1/filitheyo':'Hanging','/swing-3/filitheyo':'With Stand',
}
products={};redirects=[];image_map={}
map_path=Path('docs/image-name-map.json')
if map_path.exists():image_map=json.loads(map_path.read_text())
def name_image(old,base,index):
    if old in image_map:return image_map[old]
    new=f'/images/products/{base}-{index:02d}.webp'
    used=set(image_map.values());number=index
    while new in used:number+=1;new=f'/images/products/{base}-{number:02d}.webp'
    oldfile=Path('public'+old);newfile=Path('public'+new)
    if oldfile.exists():oldfile.rename(newfile)
    elif not newfile.exists():raise RuntimeError(f'Missing image {old}')
    image_map[old]=new
    return new
for page in pages:
    path=page['path']
    if not re.match(r'^/(chair|sofa|swing|table)-\d+/',path) or path in merge:continue
    kind=path.split('/')[1].split('-')[0];cat=category_map[kind]
    name=page['title'].split('|')[0].strip().replace('Whit Roof','With Roof').replace('Roking','Rocking')
    variant=variants.get(path,'')
    display=' '.join(filter(None,[name,variant,'Cane',kind.title()]))
    slug=slugify(display)
    if any(p['slug']==slug for p in products.values()):raise RuntimeError(f'Duplicate slug: {slug}')
    source_images=list(page['images'])
    for alias,target in merge.items():
        if target==path:source_images+=next(p['images'] for p in pages if p['path']==alias)
    images=list(dict.fromkeys(source_images))
    product={'name':display,'model':name,'category':cat,'slug':slug,'path':f'/furniture/{cat}/{slug}','quotePath':f'/request-quote/{slug}','images':[name_image(img,slug,i+1) for i,img in enumerate(images)],'details':sections(path)}
    first=' '.join(product['details'][0]['text']) if product['details'] else 'View the product gallery and request dimensions, finishes and a tailored quotation.'
    product['description']=f'{display} by Vaidehi Craft. {first}'[:300]
    products[path]=product
for page in pages:
    path=page['path']
    if path in products or path in merge:
        product=products[merge.get(path,path)]
        redirects += [{'source':path,'destination':product['path'],'permanent':True},{'source':path+'/request-quote','destination':product['quotePath'],'permanent':True}]
    else:
        cat=path.strip('/')
        if cat not in category_map.values():continue
        redirects.append({'source':path,'destination':'/furniture/'+cat,'permanent':True})
        for i,image in enumerate(page['images']):name_image(image,'cane-'+cat+'-collection',i+1)
redirects.append({'source':'/contact-us','destination':'/contact','permanent':True})
Path('src/data/products.json').write_text(json.dumps(list(products.values()),indent=2)+'\n')
Path('src/data/product-index.json').write_text(json.dumps([{k:p[k] for k in ('name','slug','path','quotePath','category')} for p in products.values()],indent=2)+'\n')
Path('src/data/legacy-redirects.json').write_text(json.dumps(redirects,indent=2)+'\n')
map_path.write_text(json.dumps(image_map,indent=2)+'\n')
manifest_path=Path('docs/reference-assets.json')
manifest=json.loads(manifest_path.read_text())
for asset in manifest['assets']:asset['local']=image_map.get(asset['local'],asset['local'])
manifest_path.write_text(json.dumps(manifest,indent=2)+'\n')
print(f'Built {len(products)} distinct products; {len(image_map)} descriptive image names; {len(redirects)} one-hop redirects.')
