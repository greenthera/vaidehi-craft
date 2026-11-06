"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main id="main-content" className="min-h-screen px-6 pb-16 pt-36 text-center text-[#244536]">
    <h1 className="mb-5 text-3xl">Something went wrong</h1>
    <p className="mb-8">Please try again, or return to the home page.</p>
    <div className="flex flex-wrap justify-center gap-4">
      <button type="button" onClick={reset} className="min-h-11 cursor-pointer rounded-none button-primary px-6 py-3">Try again</button>
      <Link href="/" className="inline-flex min-h-11 items-center rounded-none button-outline px-6 py-3">Back to home</Link>
    </div>
  </main>;
}
