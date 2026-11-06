import { whatsappUrl } from "@/lib/whatsapp";
import Image from "@/components/site-image";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/vaidehi_crafts/", image: "/images/social/instagram.svg" },
  { label: "Facebook", href: "https://www.facebook.com/siddharthshahvaidehicrafts/", image: "/images/social/facebook.svg" },
  { label: "WhatsApp", href: whatsappUrl, image: "/images/social/whatsapp.svg" },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return <nav aria-label="Vaidehi Craft social profiles" className={`flex items-center gap-4 ${className}`}>
    {socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} (opens in a new tab)`} className="flex size-11 shrink-0 items-center justify-center rounded-none bg-[#244536] transition-colors hover:bg-[#183b2e] focus-visible:outline-[#244536] focus-visible:outline-offset-4"><Image src={social.image} alt="" width={22} height={22} className="size-[22px] object-contain" /></a>)}
  </nav>;
}
