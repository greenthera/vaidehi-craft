import Link from "next/link";
import { navigation } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="bg-white text-[#828282]">
      <nav aria-label="Collections" className="grid min-h-14 grid-cols-4">
        {navigation.slice(1, 5).map((item) => <Link key={item.label} href={item.href} className="flex items-center justify-center border border-[#828282]/60 min-h-14 type-footer hover:bg-[#ede7df]">{item.label.toUpperCase()}</Link>)}
      </nav>
    </footer>
  );
}
