import { stores, type StoreId } from "@/lib/stores";
import { whatsappLink } from "@/lib/whatsapp";
import Image from "@/components/site-image";

export function SocialLinks({ className = "", earthy = false, store = "surat" }: { className?: string; earthy?: boolean; store?: StoreId }) {
  const details = stores.find((item) => item.id === store)!;
  const socialLinks = [
    { label: "Instagram", href: details.instagram, image: "/images/social/instagram.svg" },
    { label: "Facebook", href: details.facebook, image: "/images/social/facebook.svg" },
    { label: "WhatsApp", href: whatsappLink(details.phone), image: "/images/social/whatsapp.svg" },
  ];
  return <nav aria-label={`Vaidehi Craft ${details.city} social profiles`} className={`flex items-center gap-4 ${className}`}>
    {socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} — ${details.city} (opens in a new tab)`} className={`flex size-11 shrink-0 items-center justify-center rounded-none transition-colors focus-visible:outline-offset-4 ${earthy ? "bg-[#783b18] hover:bg-[#5e2d13] focus-visible:outline-[#783b18]" : "bg-[#244536] hover:bg-[#183b2e] focus-visible:outline-[#244536]"}`}><Image src={social.image} alt="" width={22} height={22} className="size-[22px] object-contain" /></a>)}
  </nav>;
}
