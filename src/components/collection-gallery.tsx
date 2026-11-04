import Image from "next/image";
import Link from "next/link";
import chair from "../../public/images/cane-rocking-chair-living-room.avif";
import sofa from "../../public/images/blue-cushion-cane-sofa-set.avif";
import swing from "../../public/images/freestanding-cane-swing.avif";

const collections = [
  { name: "CHAIR", href: "/furniture/chairs", image: chair, alt: "Cane rocking chair with patterned cushions beside a wooden side table" },
  { name: "SOFA", href: "/furniture/sofas", image: sofa, alt: "Handcrafted cane sofa and matching armchair with blue upholstery" },
  { name: "SWING", href: "/furniture/swings", image: swing, alt: "Freestanding wooden swing with patterned cushions in a sunlit room" },
];

export function CollectionGallery() {
  return <section aria-label="Explore our furniture collections" className="bg-[#ede7df]">
    <div className="grid grid-cols-[0.667fr_1.487fr_0.669fr] gap-[1.4vw] max-[750px]:grid-cols-1 max-[750px]:gap-5 max-[750px]:px-[var(--home-gutter,24px)]">
      {collections.map((item) => <Link key={item.href} href={item.href} aria-label={`Explore ${item.name.toLowerCase()} collection`} className="group relative block h-[34.529vw] overflow-hidden max-[750px]:h-auto">
        <Image src={item.image} alt={item.alt} sizes={item.name === "SOFA" ? "(max-width: 750px) calc(100vw - 48px), 52vw" : "(max-width: 750px) calc(100vw - 48px), 24vw"} className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105 max-[750px]:h-auto" />
        <h2 className={`absolute top-[2.5vw] type-collection-label text-[#b4581a] max-[750px]:right-[9%] max-[750px]:top-[8vw] ${item.name === "SOFA" ? "right-[16%]" : "right-[9%]"}`}>{item.name}</h2>
        <span className="absolute inset-x-0 bottom-[2.1vw] max-[750px]:bottom-[6%] flex justify-center opacity-100 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-100"><span className="flex h-[3.15vw] w-[13.3vw] items-center justify-center border border-white text-[14px] leading-[17px] text-white max-[750px]:h-11 max-[750px]:w-44">EXPLORE</span></span>
      </Link>)}
    </div>
  </section>;
}
