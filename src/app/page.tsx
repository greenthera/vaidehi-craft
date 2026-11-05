import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { StoreVideo } from "@/components/store-video";
import { CollectionGallery } from "@/components/collection-gallery";
import hero from "../../public/images/cane-hanging-chair-curtain-interior.avif";
import spaces from "../../public/images/curated-cane-living-space.avif";
import cane from "../../public/images/handwoven-cane-joinery-detail.avif";
import founder from "../../public/images/siddharrtha-shahh-vaidehi-craft-founder.avif";

export default function Home() {
  return <>


    <main id="main-content" className="[--home-paragraph-gap:0.5rem] [--home-gutter:24px] min-[1100px]:[--home-gutter:7.32482vw]">
      <section aria-labelledby="home-title" className="relative min-h-[min(780px,100svh)] bg-[#c1a081] max-[750px]:min-h-[85svh]">
        <Image src={hero} alt="Cane hanging chair in a sunlit space draped with flowing white curtains" fill priority sizes="100vw" className="object-cover object-[0%_82%] max-[750px]:object-center" />
        <h1 id="home-title" className="absolute inset-x-0 bottom-10 px-[var(--home-gutter)] text-center type-hero text-white max-[750px]:bottom-8">Where every piece is a masterpiece.</h1>
      </section>
      <div aria-hidden="true" className="h-[5.45214vw] max-[750px]:h-6 bg-[#ede7df]" />
      <CollectionGallery />
      <div aria-hidden="true" className="h-[clamp(24px,5.09506vw,96px)] bg-[#ede7df]" />

      <section aria-labelledby="spaces-title" className="relative min-h-[600px] text-white min-[1000px]:min-h-[45.52557vw]">
        <Image src={spaces} alt="A curated living space with cane furniture, woven wall art and warm lighting" fill sizes="100vw" className="object-cover object-[0%_5%]" />
        <p className="relative mx-[var(--home-gutter)] pt-8 type-spaces-copy [text-shadow:0_1px_4px_#0009] md:pt-[3vw] min-[1100px]:ml-auto min-[1100px]:w-[min(290px,32%)]">We don&apos;t just create furniture; we craft environments. From home to offices and commercial spaces, our expertise lies in enhancing entire spaces with thoughtfully curated designs that seamlessly blend functionality and artistry, bringing your vision to life.</p>
        <h2 id="spaces-title" className="absolute bottom-[9%] left-[var(--home-gutter)] right-[var(--home-gutter)] type-spaces-title [text-shadow:0_1px_4px_#0009]">Beyond Furniture:<br />Transforming Spaces.</h2>
      </section>
      <div className="flex min-h-24 items-center justify-center bg-white px-[var(--home-gutter)] py-5">
        <Link href="/furniture/sofas" className="flex min-h-11 min-w-[142px] items-center justify-center border border-black px-5 text-sm transition-colors hover:bg-black hover:text-white">EXPLORE</Link>
      </div>

      <section aria-labelledby="store-title" className="grid bg-white min-[900px]:grid-cols-2 min-[1100px]:min-h-[55.66723vw]">
        <div className="relative flex min-w-0 flex-col gap-3 max-[1099px]:gap-[var(--home-paragraph-gap)] px-[var(--home-gutter)] py-6 type-store-copy text-[#b4581a] min-[1100px]:gap-[1vw] min-[1100px]:px-0 min-[1100px]:pb-0 min-[1100px]:pt-[15.16713vw]">
          <div className="space-y-3 max-[1099px]:space-y-[var(--home-paragraph-gap)] min-[1100px]:ml-auto min-[1100px]:mr-[var(--home-gutter)] min-[1100px]:w-[40.83249%] min-[1100px]:space-y-0 min-[1100px]:text-justify">
          <h2 id="store-title" className="text-left min-[1100px]:text-right font-bold [font-family:var(--font-reference-statement)] min-[1100px]:mb-[1.25vw]">Canearth15 Pop-Up Store</h2>
          <p>Step into timeless elegance and craftsmanship with Canearth15 by Vaidehi Craft. This exclusive pop-up store unveils a curated collection of exquisite cane furniture that celebrates traditional craftsmanship blended with modern aesthetics.</p>
          <p>Designed with a boho-chic vibe, the store offers an immersive experience, showcasing furniture in a setting that highlights its beauty and functionality. From intricate cane weaves to innovative designs, every piece is a testament to Vaidehi Craft&apos;s dedication to quality, sustainability and elegance.</p>
          </div>
          <p className="type-store-last min-[1100px]:ml-auto min-[1100px]:mr-[var(--home-gutter)] min-[1100px]:w-[53.9278%] min-[1100px]:text-justify">Explore a space where tradition meets innovation, and discover how the warmth and versatility of cane furniture can transform a space into a haven of comfort and style. At Canearth15, we invite you to experience the story, artistry and heart behind every creation.</p>
        </div>
        <div className="min-h-[clamp(280px,58vw,440px)] min-[900px]:min-h-0"><StoreVideo /></div>
      </section>
      <div aria-hidden="true" className="hidden h-[clamp(24px,3.08979vw,60px)] bg-white min-[1100px]:block" />

      <section aria-labelledby="cane-title" className="relative flex min-h-[700px] flex-col justify-between gap-12 px-[var(--home-gutter)] py-10 text-white min-[1100px]:min-h-[52.58654vw] min-[1100px]:flex-row min-[1100px]:items-end">
        <Image src={cane} alt="Close-up of hand-wrapped cane joinery and the natural woven material" fill sizes="100vw" className="object-cover object-[0%_26%]" />
        <div className="relative w-full space-y-5 max-[1099px]:space-y-[var(--home-paragraph-gap)] type-cane-copy [text-shadow:0_1px_4px_#0009] min-[1100px]:order-2 min-[1100px]:ml-auto min-[1100px]:max-w-sm min-[1100px]:w-[23%] min-[1100px]:self-start">
          <p>Cane is the poetry of luxury, a material that bends gracefully into forms bamboo could only dream of. At Vaidehi Craft, we take this exceptional natural wonder and sculpt it into art—functional, elegant, and timeless.</p>
          <p>This isn’t just furniture; it’s an ode to artistry, an experience of exclusivity. Step beyond the ordinary and into the extraordinary.</p>
          <p>Because Cane is Not Bamboo—it’s the essence of bespoke living.</p>
        </div>
        <h2 id="cane-title" className="relative type-cane-title [text-shadow:0_1px_4px_#0006]">CANE<br />IS NOT BAMBOO</h2>
      </section>

      <section id="our-story" aria-labelledby="founder-title" className="grid items-center gap-5 bg-white px-[var(--home-gutter)] py-6 min-[900px]:grid-cols-2 min-[1100px]:gap-[6%] min-[1100px]:py-[6vw]">
        <div className="min-w-0 space-y-3 max-[1099px]:space-y-[var(--home-paragraph-gap)] type-founder text-[#a64444] text-left min-[1100px]:text-right min-[1100px]:space-y-6">
          <div><h2 id="founder-title" className="font-bold">Siddharrtha Shahh</h2><p>Cane Maven</p></div>
          <p>Siddharrtha Shahh, founder of Vaidehi Craft, has redefined cane furniture by blending traditional craftsmanship with modern aesthetics since 1998. With a passion for artistry and sustainability, he champions eco-conscious practices, using sustainable materials and supporting local artisans.</p>
          <p>Under his leadership, the brand has grown from a local enterprise to a global symbol of excellence, known for its innovative and elegant designs. Siddharrtha&apos;s commitment to preserving heritage, uplifting artisan communities, and promoting social responsibility has made him a respected figure in art and craftsmanship.</p>
          <p>His journey exemplifies resilience, determination, and a visionary approach, transforming Vaidehi Craft into a benchmark for quality, innovation, and sustainability.</p>
        </div>
        <Image src={founder} alt="Founder of Vaidehi Craft, Siddharrtha Shahh" sizes="(max-width: 900px) 90vw, 38vw" className="mx-auto h-auto w-full max-w-[540px]" />
      </section>
    </main>
    <SiteFooter />
  </>;
}
