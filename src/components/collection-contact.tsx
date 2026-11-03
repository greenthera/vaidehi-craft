import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/vaidehi-craft-green-logo.avif";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/vaidehi_crafts/", image: "/images/instagram-contact.png" },
  { label: "Facebook", href: "https://www.facebook.com/siddharthshahvaidehicrafts/", image: "/images/facebook-contact.png" },
  { label: "WhatsApp", href: "https://wa.me/919824177913", image: "/images/whatsapp-contact.png" },
];

export function CollectionContact() {
  return (
    <section aria-label="Visit and contact Vaidehi Craft" className="grid bg-[#ede7df] px-6 py-10 text-[#b4581a] min-[751px]:min-h-[clamp(310px,22.3vw,460px)] min-[751px]:grid-cols-2 min-[751px]:px-0 min-[751px]:py-[2vw]">
      <div className="flex items-center justify-center pb-8 min-[751px]:justify-end min-[751px]:pb-0 min-[751px]:pr-[3.2vw]">
        <Link href="/contact" aria-label="Contact Vaidehi Craft"><Image src={logo} alt="Vaidehi Craft" sizes="(max-width: 750px) 160px, (max-width: 1440px) 13vw, 240px" className="h-auto w-40 min-[751px]:w-[clamp(150px,12.5vw,240px)]" /></Link>
      </div>
      <div className="flex min-w-0 flex-col justify-center border-t-[5px] border-[#f7f7f3] pt-8 min-[751px]:border-l-[5px] min-[751px]:border-t-0 min-[751px]:py-7 min-[751px]:pl-[2.6vw] min-[751px]:pr-6">
        <dl className="space-y-5 type-contact-details min-[751px]:space-y-5">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1"><dt className="font-bold">EMAIL</dt><dd className="min-w-0"><a href="mailto:connect@vaidehicraft.com" className="break-all hover:underline">connect@vaidehicraft.com</a></dd></div>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1"><dt className="font-bold">STORE</dt><dd>Surat | Pune</dd></div>
          <div className="flex items-baseline gap-6"><dt className="font-bold">SINCE</dt><dd>1998</dd></div>
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1"><dt className="font-bold">Contact No</dt><dd><a href="tel:+919824177913" className="hover:underline">+91-9824177913</a></dd></div>
        </dl>
        <nav aria-label="Vaidehi Craft social profiles" className="mt-4 flex gap-4 min-[751px]:gap-5">
          {socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="flex size-14 items-center justify-center rounded-full transition-opacity hover:opacity-75"><Image src={social.image} alt="" width={48} height={48} className="size-12" /></a>)}
        </nav>
      </div>
    </section>
  );
}
