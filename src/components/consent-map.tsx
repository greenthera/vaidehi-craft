"use client";

import { useSyncExternalStore } from "react";
import { acceptedCategory } from "vanilla-cookieconsent";
import { showCookiePreferences } from "@/lib/cookie-consent";

function subscribe(callback: () => void) {
  window.addEventListener("cookie-preferences-updated", callback);
  return () => window.removeEventListener("cookie-preferences-updated", callback);
}
export function ConsentMap({ city, address }: { city: string; address: string }) {
  const allowed = useSyncExternalStore(subscribe, () => acceptedCategory("maps"), () => false);
  return allowed ? <iframe title={`Vaidehi Craft ${city} store location`} src={`https://www.google.com/maps?q=${encodeURIComponent(`Vaidehi Craft, ${address}`)}&output=embed`} width="400" height="200" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="mt-4 h-[200px] w-full border-0" /> : <div className="mt-4 flex min-h-[200px] flex-col items-center justify-center gap-3 border border-[#d3c5af] bg-[#f7f4ee] p-5 text-center"><p className="text-sm leading-6 text-[#526356]">Enable Google Maps in your cookie preferences to view this store location.</p><button type="button" onClick={() => { void showCookiePreferences(); }} className="min-h-11 cursor-pointer border border-[#244536] px-4 py-2 text-sm text-[#244536] hover:bg-[#ede7df]">Manage map preferences</button></div>;
}
