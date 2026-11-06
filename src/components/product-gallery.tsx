"use client";

import Image from "@/components/site-image";
import { useEffect, useRef, useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeIndex = useRef(0);
  const frame = useRef<number | null>(null);
  useEffect(() => () => { if (frame.current !== null) window.cancelAnimationFrame(frame.current); }, []);
  function handleScroll() {
    if (frame.current !== null) return;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = null;
      const element = track.current;
      if (!element) return;
      const next = Math.max(0, Math.min(images.length - 1, Math.round(element.scrollLeft / Math.max(1, element.clientWidth))));
      if (next !== activeIndex.current) { activeIndex.current = next; setActive(next); }
    });
  }
  function goTo(index: number) {
    const element = track.current;
    if (!element) return;
    const target = Math.max(0, Math.min(images.length - 1, index));
    element.scrollTo({ left: target * element.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <section aria-label={`${name} photo gallery`} aria-roledescription="carousel" className="min-w-0 bg-[#f6f4ef]">
    <div className="relative">
    <div ref={track} tabIndex={0} aria-label="Product images. Swipe or use the previous and next buttons." onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); goTo(active + (event.key === "ArrowRight" ? 1 : -1)); } }} onScroll={handleScroll} className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {images.map((image, index) => <div key={image} role="group" aria-label={`Image ${index + 1} of ${images.length}`} className="relative aspect-[3/4] w-full shrink-0 snap-start"><Image src={image} alt={`${name}, product photograph ${index + 1}`} fill priority={index === 0} sizes="(max-width: 750px) 100vw, 51vw" className="object-cover" /></div>)}
    </div>
    {images.length > 1 && <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-3 sm:px-5">
      <button type="button" aria-label={`Previous image of ${name}`} disabled={active === 0} onClick={() => goTo(active - 1)} className="button-primary pointer-events-auto flex size-11 cursor-pointer items-center justify-center shadow-md disabled:cursor-default disabled:opacity-40">
        <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 6-6 6 6 6" /></svg>
      </button>
      <button type="button" aria-label={`Next image of ${name}`} disabled={active >= images.length - 1} onClick={() => goTo(active + 1)} className="button-primary pointer-events-auto flex size-11 cursor-pointer items-center justify-center shadow-md disabled:cursor-default disabled:opacity-40">
        <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10 6 6 6-6 6" /></svg>
      </button>
    </div>}
    </div>
    {images.length > 1 && <p aria-live="polite" aria-atomic="true" className="flex min-h-12 items-center justify-center px-4 text-xs">{Math.min(active + 1, images.length)} / {images.length}</p>}
  </section>;
}
