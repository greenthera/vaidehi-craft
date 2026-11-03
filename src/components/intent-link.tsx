"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

const warmedUntil = new Map<string, number>();

/** Prefetch product routes on intent, rather than every card passing the viewport. */
export function IntentLink({ href, onPointerEnter, onFocus, onTouchStart, ...props }: ComponentProps<typeof Link>) {
  const router = useRouter();
  function warm() {
    if (typeof href !== "string" || !href.startsWith("/") || (warmedUntil.get(href) ?? 0) > Date.now()) return;
    warmedUntil.set(href, Date.now() + 30_000);
    router.prefetch(href);
  }
  return <Link {...props} href={href} prefetch={false}
    onPointerEnter={(event) => { warm(); onPointerEnter?.(event); }}
    onFocus={(event) => { warm(); onFocus?.(event); }}
    onTouchStart={(event) => { warm(); onTouchStart?.(event); }} />;
}
