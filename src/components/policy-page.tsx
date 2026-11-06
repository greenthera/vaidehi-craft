import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs, InnerPage } from "@/components/inner-page";
import { PageHeading } from "@/components/page-heading";

export function PolicyPage({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <InnerPage><article className="mx-auto max-w-[1600px] px-6 pb-12 pt-6 min-[1100px]:px-[7.32482vw]">
    <Breadcrumbs items={[{ name: title.replace(/\.+$/, "") }]} />
    <PageHeading eyebrow="Your information & your choices" title={title} description={description} />
    <p className="mb-8 text-xs text-[#617066]">Last updated: 5 November 2026</p>
    <div className="max-w-3xl space-y-8 text-sm leading-7 text-[#526356] [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:leading-snug [&_h2]:text-[#244536] [&_p+p]:mt-3 [&_a]:underline [&_a]:underline-offset-4 [&_a]:text-[#783b18] [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-5">{children}
      <section><h2>Contact us</h2><p>For privacy or cookie questions, email <a href="mailto:connect@vaidehicraft.com">connect@vaidehicraft.com</a>, call <a href="tel:+919824177913">+91 98241 77913</a>, or visit our <Link href="/contact">contact page</Link>.</p></section>
    </div>
  </article></InnerPage>;
}
