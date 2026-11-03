export default function Loading() {
  return <main id="main-content" aria-busy="true" className="min-h-screen bg-white px-6 pt-36 text-[#244536]">
    <div role="status" className="mx-auto max-w-sm text-center"><p className="mb-5 text-sm tracking-wide">Loading your next page…</p><progress aria-label="Loading page" className="h-1 w-full accent-[#244536]" /></div>
  </main>;
}
