import type { Metadata } from "next";
import Link from "next/link";
import { InnerPage } from "@/components/inner-page";

export const metadata: Metadata = {
  title: "Page Not Found | Vaidehi Craft",
  description: "This page could not be found. Explore Vaidehi Craft furniture collections or contact us for help.",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return <InnerPage><section className="mx-auto max-w-2xl px-6 py-16 text-center text-[#244536]">
    <h1 className="mb-5 text-3xl">Page not found</h1>
    <p className="mb-8 leading-relaxed">The page may have moved. Explore our furniture collections or contact us for help.</p>
    <div className="flex flex-wrap justify-center gap-4">
      <Link href="/" className="inline-flex min-h-11 items-center rounded-lg bg-[#244536] px-6 py-3 text-white">Back to home</Link>
      <Link href="/contact" className="inline-flex min-h-11 items-center rounded-lg border border-[#244536] px-6 py-3">Contact us</Link>
    </div>
  </section></InnerPage>;
}
