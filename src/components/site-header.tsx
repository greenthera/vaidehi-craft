"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState, useSyncExternalStore } from "react";
import logo from "../../public/images/vaidehi-craft-green-logo.avif";
import { navigation } from "@/lib/navigation";

function subscribeScroll(callback: () => void) {
  let previous = scrollSnapshot();
  const onScroll = () => {
    const current = scrollSnapshot();
    if (current !== previous) { previous = current; callback(); }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}
const scrollSnapshot = () => window.scrollY > 32;
const serverScrollSnapshot = () => false;

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const navigationVersion = useRef(0);
  const scrolled = useSyncExternalStore(subscribeScroll, scrollSnapshot, serverScrollSnapshot);
  const menu = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const animations = useRef<Animation[]>([]);
  const transition = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => () => { transition.current += 1; navigationVersion.current += 1; animations.current.forEach((animation) => animation.cancel()); }, []);

  function openMenu() {
    if (!menu.current || !panel.current || !backdrop.current || menu.current.open) return;
    transition.current += 1;
    animations.current.forEach((animation) => animation.cancel());
    if (!menu.current.open) {
      menu.current.showModal();
      menu.current.focus({ preventScroll: true });
    }
    setMenuOpen(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animations.current = [
      backdrop.current.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 280, easing: "ease-out" }),
      panel.current.animate([{ transform: "translate3d(100%, 0, 0)" }, { transform: "translate3d(0, 0, 0)" }], { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }),
    ];
  }

  async function closeMenu() {
    if (!menu.current?.open || !panel.current) return;
    const version = ++transition.current;
    const position = window.getComputedStyle(panel.current).transform;
    const opacity = backdrop.current ? window.getComputedStyle(backdrop.current).opacity : "1";
    animations.current.forEach((animation) => animation.cancel());
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animations.current = [
        backdrop.current!.animate([{ opacity }, { opacity: 0 }], { duration: 260, easing: "ease-in", fill: "forwards" }),
        panel.current.animate([{ transform: position }, { transform: "translate3d(100%, 0, 0)" }], { duration: 260, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "forwards" }),
      ];
      await Promise.allSettled(animations.current.map((animation) => animation.finished));
    }
    if (version !== transition.current) return;
    menu.current?.close();
    animations.current.forEach((animation) => animation.cancel());
    setMenuOpen(false);
  }

  async function navigateFromMenu(href: string) {
    const version = ++navigationVersion.current;
    router.prefetch(href);
    await closeMenu();
    if (version !== navigationVersion.current) return;
    if (href === pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      return;
    }
    startTransition(() => router.push(href, { scroll: true }));
  }

  return <>
    <header className={`fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between px-5 transition-[background-color,box-shadow] duration-300 sm:h-24 sm:px-[7.5%] ${scrolled || pathname !== "/" ? "bg-[#f7f4ee] shadow-sm" : "bg-transparent"}`}>
      <Link href="/" aria-label="Vaidehi Craft home" className="w-32 shrink-0 sm:w-44"><Image src={logo} alt="Vaidehi Craft" priority sizes="(max-width: 640px) 128px, 176px" className="h-auto w-full" /></Link>
      <div className="flex items-center gap-3 sm:gap-6">
        <button type="button" aria-label="Open menu" aria-haspopup="dialog" aria-controls="site-menu" aria-expanded={menuOpen} onClick={openMenu} className="flex h-11 min-w-24 cursor-pointer items-center justify-center rounded-none border border-[#244536]/60 px-6 text-xs font-bold tracking-[0.18em] text-[#244536] transition-colors hover:bg-[#244536] hover:text-white">MENU</button>
      </div>
    </header>

    <dialog ref={menu} id="site-menu" tabIndex={-1} aria-label="Site navigation" onCancel={(event) => { event.preventDefault(); void closeMenu(); }} onClick={(event) => { if (event.target === event.currentTarget) void closeMenu(); }} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 [contain:paint] focus:outline-none backdrop:bg-transparent">
      <div ref={backdrop} aria-hidden="true" onClick={() => { void closeMenu(); }} className="absolute inset-0 bg-black/45" />
      <div ref={panel} className="relative ml-auto flex h-full w-full max-w-[480px] flex-col overflow-y-auto border-l border-[#c9b68f]/25 bg-[#183b2e] px-7 py-7 text-[#f3edde] shadow-2xl [backface-visibility:hidden] [transform:translate3d(0,0,0)] [will-change:transform] overscroll-contain sm:px-12 sm:py-9">
        <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between gap-4 border-b border-white/15 bg-[#183b2e] pb-5 pt-1"><Link href="/" aria-label="Vaidehi Craft home" onNavigate={(event) => { event.preventDefault(); void navigateFromMenu("/"); }}><Image src={logo} alt="Vaidehi Craft" width={140} className="h-auto w-32 brightness-0 invert" /></Link><button type="button" aria-label="Close menu" onClick={() => { void closeMenu(); }} className="relative z-20 inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-none border border-[#f3edde] bg-[#f3edde] px-3 text-sm font-bold text-[#183b2e] transition-colors hover:bg-white focus-visible:outline-white forced-colors:border-[ButtonText] forced-colors:bg-[ButtonFace] forced-colors:text-[ButtonText]"><span>Close</span><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="block shrink-0"><path d="m6 6 12 12M18 6 6 18" /></svg></button></div>
        <p className="mt-8 text-[10px] uppercase tracking-[0.26em] text-[#cfbc95]">The art of natural living</p>
        <nav aria-label="Main navigation" className="my-7 flex flex-col">{navigation.map((item, index) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} onNavigate={(event) => { event.preventDefault(); void navigateFromMenu(item.href); }} className="group flex min-h-14 items-center gap-5 border-b border-white/10 py-3 text-2xl transition-colors hover:text-[#d4bb88] aria-[current=page]:text-[#d4bb88] sm:min-h-16 sm:text-3xl"><span className="text-[10px] tracking-wider text-[#b6bfae]">{String(index + 1).padStart(2, "0")}</span><span className="transition-transform duration-300 motion-safe:group-hover:translate-x-2">{item.label === "Home" || item.label === "Contact" ? item.label : `${item.label}s`}</span></Link>;
        })}</nav>
        <div className="mt-auto pt-3"><Link href="/request-quote" onNavigate={(event) => { event.preventDefault(); void navigateFromMenu("/request-quote"); }} className="block rounded-none bg-[#d4bb88] px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-[#183b2e] transition-colors hover:bg-[#e3cea7]">Request a quote</Link><div className="mt-7 flex items-center justify-between text-xs text-[#b6bfae]"><span>Handcrafted since 1998</span><Link href="/contact" onNavigate={(event) => { event.preventDefault(); void navigateFromMenu("/contact"); }} className="underline underline-offset-4">Get in touch</Link></div></div>
      </div>
    </dialog>

  </>;
}
