import Image from "next/image";

export function FloatingWhatsApp() {
  return <a
    href="https://wa.me/919824177913"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Vaidehi Craft on WhatsApp (opens in a new tab)"
    className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex size-12 items-center justify-center bg-[#244536] shadow-lg transition-colors hover:bg-[#183b2e] focus-visible:outline-offset-4 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:right-[max(1.5rem,env(safe-area-inset-right))] sm:size-14"
  >
    <Image src="/images/social/whatsapp.svg" alt="" width={28} height={28} className="size-7" />
  </a>;
}
