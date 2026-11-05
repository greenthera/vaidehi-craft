"use client";

import { useEffect } from "react";
import { initCookieConsent, showCookiePreferences } from "@/lib/cookie-consent";

export function CookieConsentBanner() {
  useEffect(() => { void initCookieConsent(); }, []);
  return null;
}

export function CookieSettings() {
  return <button type="button" onClick={() => { void showCookiePreferences(); }} className="inline-flex min-h-11 cursor-pointer items-center underline underline-offset-4 hover:text-[#244536]">Cookie settings</button>;
}
