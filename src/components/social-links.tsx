import Image from "next/image";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/vaidehi_crafts/", image: "/images/social/instagram.svg" },
  { label: "Facebook", href: "https://www.facebook.com/siddharthshahvaidehicrafts/", image: "/images/social/facebook.svg" },
  { label: "WhatsApp", href: "https://wa.me/919824177913", image: "/images/social/whatsapp.svg" },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return <nav aria-label="Vaidehi Craft social profiles" className={`flex items-center gap-4 ${className}`}>
    {socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} (opens in a new tab)`} className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#783b18] transition-colors hover:bg-[#5e2d13] focus-visible:outline-[#783b18] focus-visible:outline-offset-4"><Image src={social.image} alt="" width={22} height={22} className="size-[22px] object-contain" /></a>)}
  </nav>;
}
