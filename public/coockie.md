Step 1: Install
npm install vanilla-cookieconsent
Step 2: Set default consent in index.html
This must come before the GTM snippet so every tag starts in the "denied" state.

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Site</title>

    <!-- 1. Consent defaults (denied) -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        wait_for_update: 500
      });
    </script>

    <!-- 2. GTM head snippet: paste yours here -->
  </head>
  <body>
    <!-- 3. GTM noscript snippet: paste yours here -->
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
Step 3: Create the config file src/cookieConsent.js
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

// Push consent updates to Google Tag Manager
function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

function updateGoogleConsent() {
  const analytics = CookieConsent.acceptedCategory("analytics");
  const marketing = CookieConsent.acceptedCategory("marketing");

  gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
  });
}

export function initCookieConsent() {
  CookieConsent.run({
    // Re-ask users if you change categories or policy (bump this number)
    revision: 1,

    // Cookie that stores the visitor's choice
    cookie: {
      name: "cc_cookie",
      expiresAfterDays: 182, // ~6 months
    },

    // Layout and behaviour
    guiOptions: {
      consentModal: {
        layout: "box inline",        // box | cloud | bar (+ " inline")
        position: "bottom right",
        equalWeightButtons: true,    // Accept and Reject look equal (good practice)
        flipButtons: false,
      },
      preferencesModal: {
        layout: "box",
        equalWeightButtons: true,
      },
    },

    categories: {
      necessary: { enabled: true, readOnly: true },

      analytics: {
        // Delete these cookies automatically if the user withdraws consent
        autoClear: {
          cookies: [
            { name: /^_ga/ },   // GA4 cookies (_ga, _ga_XXXX)
            { name: "_gid" },
            { name: /^_clck/ }, // Clarity
            { name: /^_clsk/ }, // Clarity
            { name: "CLID" },   // Clarity
          ],
        },
      },

      marketing: {},
    },

    // Fire on first visit, on every return visit, and when preferences change
    onFirstConsent: updateGoogleConsent,
    onConsent: updateGoogleConsent,
    onChange: updateGoogleConsent,

    language: {
      default: "en",
      translations: {
        en: {
          consentModal: {
            title: "We use cookies",
            description:
              'We use cookies to understand how visitors use our site and to improve it. You can accept all, reject non-essential cookies, or choose your own settings. Read our <a href="/privacy-policy" class="cc__link">Privacy Policy</a>.',
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            showPreferencesBtn: "Manage preferences",
          },
          preferencesModal: {
            title: "Cookie preferences",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            savePreferencesBtn: "Save preferences",
            closeIconLabel: "Close",
            sections: [
              {
                title: "How we use cookies",
                description:
                  "Choose which cookies you allow. You can change this at any time from the Cookie settings link in the footer.",
              },
              {
                title: "Strictly necessary",
                description: "Required for the site to function. These cannot be turned off.",
                linkedCategory: "necessary",
              },
              {
                title: "Analytics",
                description:
                  "Help us understand site usage through Google Analytics and Microsoft Clarity (page views, session recordings, heatmaps).",
                linkedCategory: "analytics",
              },
              {
                title: "Marketing",
                description: "Used for advertising and remarketing.",
                linkedCategory: "marketing",
              },
            ],
          },
        },
      },
    },
  });
}
If you don't run any ad tags, delete the marketing category, its section in the preferences modal, and the three marketing lines in updateGoogleConsent (keep ad_* denied by default in index.html).

Step 4: Initialise it once in src/main.jsx
Call it outside React so StrictMode doesn't run it twice.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initCookieConsent } from "./cookieConsent";

initCookieConsent();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
Step 5: Add a "Cookie settings" link in the footer
Visitors must be able to change or withdraw consent later.

import * as CookieConsent from "vanilla-cookieconsent";

export default function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-gray-500">
      <a href="/privacy-policy" className="underline">Privacy Policy</a>
      {" · "}
      <button
        type="button"
        onClick={() => CookieConsent.showPreferences()}
        className="underline"
      >
        Cookie settings
      </button>
    </footer>
  );
}
Step 6: Match your brand (optional)
The library styles itself through CSS variables. Add this to src/index.css after your Tailwind directives:

#cc-main {
  --cc-font-family: inherit;
  --cc-bg: #ffffff;
  --cc-primary-color: #111827;
  --cc-secondary-color: #4b5563;

  --cc-btn-primary-bg: #111827;
  --cc-btn-primary-color: #ffffff;
  --cc-btn-primary-hover-bg: #374151;

  --cc-btn-secondary-bg: #f3f4f6;
  --cc-btn-secondary-color: #111827;
  --cc-btn-secondary-hover-bg: #e5e7eb;

  --cc-toggle-on-bg: #111827;
  --cc-separator-border-color: #e5e7eb;
}
For a dark theme, add the class cc--darkmode to <html> (for example, toggle it alongside your Tailwind dark class).

Step 7: Configure the tags in GTM
Google tag (GA4): nothing to change. It reads Consent Mode automatically.
Clarity tag: open it → Advanced Settings → Consent Settings → Require additional consent for tag to fire → add analytics_storage.
Turn on the overview: Admin → Container Settings → Enable consent overview, then check the shield icon in Tags to confirm what each tag requires.
The Clarity template's behaviour around consent has been changing, so check Microsoft's current Clarity consent documentation for EEA/UK/Switzerland visitors.
Step 8: Test
Run npm run dev and open the site in an incognito window. The banner should appear.
In GTM Preview, open the Consent tab. Defaults should be denied.
In DevTools → Application → Cookies, there should be no _ga* or _clck cookies before you accept.
Click Accept all. The consent state should switch to granted, and the GA4 and Clarity tags should fire.
Reload. The banner should stay hidden, and consent should be restored as granted (you'll see an update event in GTM Preview).
Click Cookie settings in the footer, turn Analytics off, and save. The _ga* and _clck cookies should be cleared.
Navigate between routes and confirm page_view fires on each (GA4 Enhanced measurement → "Page changes based on browser history events" must be on).
When everything works, go to GTM → Submit → Publish.
Common problems
Problem	Likely cause
Banner doesn't show	initCookieConsent() isn't called, or the CSS import is missing. Clear the cc_cookie cookie while testing.
Banner shows twice	StrictMode double-run, so make sure the call is in main.jsx outside components.
Tags fire before consent	The default-denied block is missing or placed after the GTM snippet.
Tags never fire after Accept	The tag's consent setting requires a type you never grant (for example, ad_storage when only analytics was accepted).
Cookies reappear after reject	The tag fires on a non-consent trigger, so check its consent settings in GTM.
Housekeeping
Add a Privacy Policy page that lists GA4 and Clarity, what they collect, and how long cookies last. The banner links to it.
If you add new tracking later, bump revision to prompt users again.
This isn't legal advice, but showing a clear banner with equal Accept/Reject buttons covers the common good-practice expectations (GDPR/DPDP).