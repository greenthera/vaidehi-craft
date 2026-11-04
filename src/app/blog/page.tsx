import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, InnerPage } from "@/components/inner-page";
import { pageMetadata } from "@/lib/seo";
import { articlePath, journalArticles } from "@/lib/journal";

export const metadata = pageMetadata("The Vaidehi Craft Journal", "Ideas for styling cane furniture, creating welcoming spaces and finding handcrafted pieces for your home.", "/blog");

export default function BlogPage() {
  const [featured, ...articles] = journalArticles;
  return <InnerPage>
    <div className="mx-auto max-w-[1600px] px-6 pb-12 pt-6 min-[1100px]:px-[7.32482vw] min-[1100px]:pb-20">
      <Breadcrumbs items={[{ name: "Journal" }]} />
      <header className="mb-8 flex flex-col gap-5 border-b border-[#d3c5af] pb-8 min-[900px]:flex-row min-[900px]:items-end min-[900px]:justify-between">
        <div><p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#783b18]">Stories, spaces & everyday living</p><h1 className="text-[clamp(40px,5vw,76px)] leading-[1.05] text-[#244536] [font-family:var(--font-reference-heading)]">The craft of<br /><span className="text-[#617066]">feeling at home.</span></h1></div>
        <p className="max-w-sm text-sm leading-7 text-[#526356]">Welcome to the Vaidehi Craft journal. Explore thoughtful interiors, woven textures, and ideas for a space that feels like you.</p>
      </header>
      <section aria-labelledby="featured-title">
        <Link href={articlePath(featured.slug)} className="group grid overflow-hidden bg-[#ede7df] min-[900px]:grid-cols-[1.2fr_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden min-[900px]:aspect-auto min-[900px]:min-h-[440px]"><Image src={featured.image} alt={featured.alt} fill priority sizes="(max-width: 899px) calc(100vw - 48px), 48vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]" /></div>
          <div className="flex flex-col justify-center p-6 sm:p-10"><p className="mb-6 text-xs uppercase tracking-[0.18em] text-[#783b18]">Featured story · {featured.category}</p><h2 id="featured-title" className="mb-5 text-[clamp(28px,3vw,44px)] leading-tight text-[#244536] [font-family:var(--font-reference-heading)]">{featured.title}</h2><p className="text-sm leading-7 text-[#526356]">{featured.description}</p><span className="mt-7 inline-flex min-h-11 items-center gap-4 text-sm text-[#783b18] underline underline-offset-4">Read the story <span aria-hidden="true">↗</span></span></div>
        </Link>
      </section>
      <section aria-labelledby="latest-title" className="mt-12 sm:mt-16">
        <div className="mb-7 flex items-baseline justify-between gap-4 border-b border-[#d3c5af] pb-4"><h2 id="latest-title" className="text-3xl text-[#244536] [font-family:var(--font-reference-heading)]">More from the journal</h2><span className="text-xs uppercase tracking-widest text-[#617066]">Ideas to live with</span></div>
        <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2">{articles.map((article) => <article key={article.slug}><Link href={articlePath(article.slug)} className="group block"><div className="relative aspect-[16/10] overflow-hidden bg-[#ede7df]"><Image src={article.image} alt={article.alt} fill sizes="(max-width: 639px) calc(100vw - 48px), 43vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]" /></div><p className="mb-3 mt-5 text-xs uppercase tracking-[0.16em] text-[#783b18]">{article.category}</p><h3 className="mb-3 text-2xl leading-snug text-[#244536] group-hover:underline">{article.title}</h3><p className="text-sm leading-7 text-[#526356]">{article.description}</p><span className="mt-3 inline-flex min-h-11 items-center gap-3 text-sm text-[#783b18]">Read the story <span aria-hidden="true">→</span></span></Link></article>)}</div>
      </section>
      <aside className="mt-12 flex flex-col gap-6 border-y border-[#d3c5af] py-8 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="mb-2 text-2xl text-[#244536]">Bring an idea home.</h2><p className="text-sm leading-7 text-[#526356]">Find handcrafted pieces for your space, or talk through your ideas with us.</p></div><Link href="/request-quote" className="inline-flex min-h-12 shrink-0 items-center justify-center bg-[#244536] px-6 py-3 text-sm text-white transition-colors hover:bg-[#183b2e]">Start a conversation <span aria-hidden="true" className="ml-4">→</span></Link></aside>
    </div>
  </InnerPage>;
}
