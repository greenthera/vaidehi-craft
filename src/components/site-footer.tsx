import { CookieSettings } from "@/components/cookie-consent";
import Link from "next/link";
import { navigation } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="bg-white text-[#828282]">
      <nav aria-label="Collections" className="grid min-h-14 grid-cols-4">
        {navigation.slice(1, 5).map((item) => <Link key={item.label} href={item.href} className="flex items-center justify-center border border-[#828282]/60 min-h-14 px-2 py-2 text-center type-footer hover:bg-[#ede7df]">{item.label.toUpperCase()}</Link>)}
      </nav>
      <nav aria-label="Privacy and cookies" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 py-4 text-sm text-[#526356]">
        <Link href="/privacy-policy" className="inline-flex min-h-11 items-center underline underline-offset-4">Privacy policy</Link>
        <Link href="/cookie-policy" className="inline-flex min-h-11 items-center underline underline-offset-4">Cookie policy</Link>
        <CookieSettings />
      </nav>
      <div className="flex flex-col items-center justify-between gap-2 border-t border-[#d3c5af] px-6 py-4 text-center text-xs leading-6 text-[#526356] sm:flex-row sm:text-left min-[1100px]:px-[7.32482vw]">
        <p>© 1998 – {new Date().getUTCFullYear()} Vaidehi Craft. All rights reserved.</p>
        <p>Developed by <a href="https://www.shivantra.com/?utm_source=vaidehi_craft&utm_medium=referral&utm_campaign=footer_credit" target="_blank" rel="noopener noreferrer" aria-label="Shivantra (opens in a new tab)" className="inline-flex min-h-11 items-center font-bold text-[#244536] underline underline-offset-4 hover:text-[#183b2e]">Shivantra</a></p>
      </div>
    </footer>
  );
}
