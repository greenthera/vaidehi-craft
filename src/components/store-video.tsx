"use client";

import { assetPath } from "@/lib/site-path";
import { useEffect, useRef } from "react";

export function StoreVideo({ src = "/media/canearth15-store-tour.mp4", poster = "/images/canearth15-store-video-poster.webp", deferOnMobile = false, label = "A tour of the Canearth15 pop-up store" }: { src?: string; poster?: string; label?: string; deferOnMobile?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const element = video.current;
    if (!element || !deferOnMobile) return;
    const mobile = window.matchMedia("(max-width: 750px)");
    const load = () => {
      if (element.dataset.loaded) return;
      element.dataset.loaded = "true";
      element.src = assetPath(src);
      element.load();
      void element.play().catch(() => { /* Autoplay may be restricted by the browser. */ });
    };
    if (!mobile.matches || !("IntersectionObserver" in window)) { load(); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { load(); observer.disconnect(); }
    }, { rootMargin: "300px 0px" });
    observer.observe(element);
    const onResize = () => { if (!mobile.matches) { load(); observer.disconnect(); } };
    mobile.addEventListener("change", onResize);
    return () => { observer.disconnect(); mobile.removeEventListener("change", onResize); };
  }, [deferOnMobile, src]);
  return (
    <div className="relative h-full min-w-0 [min-height:inherit] bg-[#dcc7b3]">
      <video ref={video} autoPlay muted loop playsInline controls={false} disablePictureInPicture disableRemotePlayback preload={deferOnMobile ? "none" : "metadata"} poster={assetPath(poster)} aria-label={label} className="pointer-events-none absolute inset-0 h-full w-full object-cover">
        <source src={assetPath(src)} type="video/mp4" media={deferOnMobile ? "(min-width: 751px)" : undefined} />
      </video>
    </div>
  );
}
