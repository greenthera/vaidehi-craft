"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/** Keep route transitions independent of the previous page's scroll position. */
export function ScrollToTop() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = previous; };
  }, []);
  useLayoutEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
