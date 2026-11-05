import { PageHeading } from "@/components/page-heading";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, InnerPage } from "@/components/inner-page";
import { articlePath, journalArticles } from "@/lib/journal";
import { metadataOrigin, pageMetadata, serializeJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return journalArticles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = journalArticles.find((item) => item.slug === slug);
  if (!article) return { title: "Article not found", robots: { index: false, follow: true } };
  const metadata = pageMetadata(article.title, article.description, articlePath(slug), article.image);
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article" as const } };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = journalArticles.find((item) => item.slug === slug);
  if (!article) notFound();
  const related = journalArticles.filter((item) => item.slug !== slug).slice(0, 2);
  const schema = {
    "@context": "https://schema.org", "@type": "BlogPosting", headline: article.title, description: article.description,
    mainEntityOfPage: `${metadataOrigin}${articlePath(slug)}`, image: `${metadataOrigin}${article.image}`,
    author: { "@type": "Organization", name: "Vaidehi Craft", url: metadataOrigin },
    publisher: { "@id": `${metadataOrigin}/#organization` }, inLanguage: "en-IN",
  };
  return <InnerPage>
    <div className="mx-auto max-w-[1600px] px-6 pb-12 pt-6 min-[1100px]:px-[7.32482vw]">
      <Breadcrumbs items={[{ name: "Journal", href: "/blog" }, { name: article.title }]} />
      <article>
        <div className="mx-auto max-w-3xl"><PageHeading eyebrow={`The Vaidehi Craft journal · ${article.category}`} title={article.title} description={article.description} /><p className="mb-8 border-t border-[#d3c5af] pt-4 text-xs uppercase tracking-widest text-[#617066]">By Vaidehi Craft</p></div>
        <figure className="mb-9"><div className="relative aspect-[4/3] bg-[#ede7df] sm:aspect-[16/9]"><Image src={article.image} alt={article.alt} fill priority sizes="(max-width: 1099px) calc(100vw - 48px), 86vw" className="object-cover" /></div><figcaption className="mt-3 text-xs leading-5 text-[#617066]">{article.alt}</figcaption></figure>
        <div className="grid gap-8 min-[1100px]:grid-cols-[200px_minmax(0,1fr)] min-[1100px]:gap-12">
          <aside aria-label="Article contents" className="border-b border-[#d3c5af] pb-5 min-[1100px]:border-b-0"><p className="mb-4 text-xs uppercase tracking-widest text-[#783b18]">In this story</p><ol className="space-y-3">{article.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`} className="inline-flex min-h-6 text-sm leading-6 text-[#526356] underline-offset-4 hover:underline">{section.heading}</a></li>)}</ol><Link href="/blog" className="mt-5 inline-flex min-h-11 items-center text-sm text-[#783b18]">← All stories</Link></aside>
          <div className="max-w-3xl">
            {article.sections.map((section, index) => <section key={section.heading} id={`section-${index + 1}`} className="mb-8 scroll-mt-28"><p aria-hidden="true" className="mb-2 text-xs text-[#783b18]">0{index + 1}</p><h2 className="mb-4 text-[clamp(24px,2.4vw,32px)] leading-snug text-[#244536]">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-3 text-base leading-8 text-[#526356]">{paragraph}</p>)}</section>)}
            <aside className="border-l-2 border-[#b4581a] bg-[#f7f4ee] p-6 sm:p-8"><p className="mb-3 text-xs uppercase tracking-widest text-[#783b18]">Inspired by the story?</p><h2 className="mb-3 text-2xl text-[#244536]">Find a piece for your space.</h2><p className="text-sm leading-7 text-[#526356]">Explore our <Link href="/furniture/chairs" className="text-[#783b18] underline underline-offset-4">chairs</Link>, <Link href="/furniture/sofas" className="text-[#783b18] underline underline-offset-4">sofas</Link>, <Link href="/furniture/swings" className="text-[#783b18] underline underline-offset-4">swings</Link>, and <Link href="/furniture/tables" className="text-[#783b18] underline underline-offset-4">tables</Link>, or share your ideas with our team.</p><Link href="/request-quote" className="mt-5 inline-flex min-h-12 items-center bg-[#244536] px-6 py-3 text-sm text-white hover:bg-[#183b2e]">Request a quote <span aria-hidden="true" className="ml-3">→</span></Link></aside>
          </div>
        </div>
      </article>
      <section aria-labelledby="related-title" className="mt-12 border-t border-[#d3c5af] pt-8"><h2 id="related-title" className="mb-6 text-3xl text-[#244536]">Keep exploring</h2><div className="grid gap-8 sm:grid-cols-2">{related.map((item) => <article key={item.slug}><Link href={articlePath(item.slug)} className="group block"><div className="relative aspect-[16/9] overflow-hidden bg-[#ede7df]"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 639px) calc(100vw - 48px), 43vw" className="object-cover" /></div><p className="mb-2 mt-4 text-xs uppercase tracking-widest text-[#783b18]">{item.category}</p><h3 className="text-xl text-[#244536] group-hover:underline">{item.title}</h3><span className="mt-3 inline-flex min-h-11 items-center text-sm text-[#783b18]">Read the story →</span></Link></article>)}</div></section>
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
  </InnerPage>;
}
