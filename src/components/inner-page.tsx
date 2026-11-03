import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";
import { SiteFooter } from "@/components/site-footer";

export function InnerPage({ children, flush = false }: { children: React.ReactNode; flush?: boolean }) {
  return <><main id="main-content" className={`min-h-screen min-w-0 bg-white ${flush ? "" : "pt-20 sm:pt-24"}`}>{children}</main><SiteFooter /></>;
}
export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  const schema = breadcrumbSchema(items);
  return <><nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-3 text-xs leading-6 text-[#617066]"><Link href="/" className="min-h-6">Home</Link>{items.map((item) => <span key={item.name} className="flex min-w-0 gap-3"><span aria-hidden="true">/</span>{item.href ? <Link href={item.href} className="hover:underline">{item.name}</Link> : <span aria-current="page">{item.name}</span>}</span>)}</nav>{schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />}</>;
}
