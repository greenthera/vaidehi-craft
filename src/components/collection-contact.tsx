import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/social-links";
import logo from "../../public/images/vaidehi-craft-green-logo.avif";



export function CollectionContact() {
  return (
    <section aria-label="Visit and contact Vaidehi Craft" className="grid bg-[#ede7df] px-6 py-8 text-[#b4581a] min-[1100px]:min-h-[clamp(310px,22.3vw,460px)] min-[751px]:grid-cols-2 min-[751px]:px-0 min-[751px]:py-5 min-[1100px]:py-[2vw]">
      <div className="flex items-center justify-center pb-6 min-[751px]:justify-end min-[751px]:pb-0 min-[751px]:pr-[3.2vw]">
        <Link href="/contact" aria-label="Contact Vaidehi Craft"><Image src={logo} unoptimized alt="Vaidehi Craft" sizes="(max-width: 750px) 160px, (max-width: 1440px) 13vw, 240px" className="h-auto w-40 min-[751px]:w-[clamp(150px,12.5vw,240px)]" /></Link>
      </div>
      <div className="flex min-w-0 flex-col justify-center min-[751px]:border-l-[5px] min-[751px]:border-[#f7f7f3] min-[751px]:py-2 min-[1100px]:py-7 min-[751px]:pl-[2.6vw] min-[751px]:pr-6">
        <dl className="grid grid-cols-[max-content_minmax(0,1fr)] items-baseline gap-x-6 gap-y-2 type-contact-details min-[751px]:gap-y-2 min-[1100px]:gap-y-5">
          <div className="contents"><dt className="font-bold">EMAIL</dt><dd className="min-w-0"><a href="mailto:connect@vaidehicraft.com" className="break-all hover:underline">connect@vaidehicraft.com</a></dd></div>
          <div className="contents"><dt className="font-bold">STORE</dt><dd>Surat | Pune</dd></div>
          <div className="contents"><dt className="font-bold">SINCE</dt><dd>1998</dd></div>
          <div className="contents"><dt className="font-bold">Contact No</dt><dd><a href="tel:+919824177913" className="hover:underline">+91-9824177913</a></dd></div>
        </dl>
        <SocialLinks className="mt-6" />
      </div>
    </section>
  );
}
