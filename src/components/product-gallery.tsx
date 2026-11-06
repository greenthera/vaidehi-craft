"use client";

import Image from "next/image";
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
    <div ref={track} tabIndex={0} aria-label="Product images. Swipe or use the previous and next buttons." onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); goTo(active + (event.key === "ArrowRight" ? 1 : -1)); } }} onScroll={handleScroll} className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {images.map((image, index) => <div key={image} role="group" aria-label={`Image ${index + 1} of ${images.length}`} className="relative aspect-[3/4] w-full shrink-0 snap-start"><Image src={image} alt={`${name}, product photograph ${index + 1}`} fill priority={index === 0} sizes="(max-width: 750px) 100vw, 51vw" className="object-cover" /></div>)}
    </div>
    {images.length > 1 && <div className="flex min-h-14 items-center justify-between gap-3 px-4 text-xs"><button type="button" disabled={active === 0} onClick={() => goTo(active - 1)} className="button-outline min-h-11 cursor-pointer px-3 disabled:cursor-default disabled:opacity-35">Previous</button><p aria-live="polite" aria-atomic="true">{Math.min(active + 1, images.length)} / {images.length}</p><button type="button" disabled={active >= images.length - 1} onClick={() => goTo(active + 1)} className="button-outline min-h-11 cursor-pointer px-3 disabled:cursor-default disabled:opacity-35">Next</button></div>}
  </section>;
}
