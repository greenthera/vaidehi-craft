import * as CookieConsent from "vanilla-cookieconsent";

let initialization: Promise<void> | undefined;
let trackingLoaded = false;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function syncConsent() {
  const analytics = CookieConsent.acceptedCategory("analytics");
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    // Google reads gtag queue entries as Arguments objects.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  // Basic consent mode: no GTM request until analytics is allowed.
  if (analytics && !trackingLoaded) {
    trackingLoaded = true;
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-KL9XWRBQ";
    document.head.appendChild(script);
  }
  window.dataLayer.push({ event: "cookie_consent_updated", analytics_consent: analytics, marketing_consent: false });
  window.dispatchEvent(new Event("cookie-preferences-updated"));
}

export function initCookieConsent() {
  if (!initialization) initialization = CookieConsent.run({
    revision: 2,
    cookie: { name: "cc_cookie", expiresAfterDays: 182 },
    guiOptions: {
      consentModal: { layout: "box inline", position: "bottom right", equalWeightButtons: true },
      preferencesModal: { layout: "box", equalWeightButtons: true },
    },
    categories: {
      necessary: { enabled: true, readOnly: true },
      analytics: { autoClear: { cookies: [{ name: /^_ga/ }, { name: "_gid" }, { name: /^_gat/ }] } },
      maps: {},
    },
    onConsent: syncConsent,
    onChange: ({ changedCategories }) => {
      syncConsent();
      // Unload already-running vendor scripts when tracking permission is withdrawn.
      if (trackingLoaded && changedCategories.some((category) => category === "analytics" && !CookieConsent.acceptedCategory(category))) window.location.reload();
    },
    language: { default: "en", translations: { en: {
      consentModal: {
        title: "Your privacy, your choice",
        description: 'We use necessary cookies to remember your choices. With your permission, we can use analytics through Google Tag Manager and embedded Google Maps. Read our <a href="/privacy-policy" class="cc__link">Privacy Policy</a> and <a href="/cookie-policy" class="cc__link">Cookie Policy</a>.',
        acceptAllBtn: "Accept all", acceptNecessaryBtn: "Reject all", showPreferencesBtn: "Manage preferences",
      },
      preferencesModal: {
        title: "Cookie preferences", acceptAllBtn: "Accept all", acceptNecessaryBtn: "Reject all", savePreferencesBtn: "Save preferences", closeIconLabel: "Close preferences",
        sections: [
          { title: "You are in control", description: "Optional categories are off until you allow them. Change or withdraw your choices at any time using Cookie settings in the footer." },
          { title: "Strictly necessary", description: "Remembers your cookie preferences for 182 days. This category is always enabled.", linkedCategory: "necessary" },
          { title: "Analytics", description: "Allows website usage measurement through our Google Tag Manager container. Your enquiry details are not included in our consent events.", linkedCategory: "analytics" },
          { title: "Google Maps", description: "Allows embedded Google Maps on the contact page. Loading a map shares connection information with Google, which may use its own cookies.", linkedCategory: "maps" },
          { title: "More information", description: 'Read our <a href="/cookie-policy" class="cc__link">Cookie Policy</a> or email <a href="mailto:connect@vaidehicraft.com" class="cc__link">connect@vaidehicraft.com</a>.' },
        ],
      },
    } } },
  });
  return initialization;
}

export async function showCookiePreferences() {
  await initCookieConsent();
  CookieConsent.showPreferences();
}
