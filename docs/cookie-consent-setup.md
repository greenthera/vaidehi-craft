# Vaidehi Craft cookie configuration

The runtime configuration is in `src/lib/cookie-consent.ts` and matches the services used by this project.

- Necessary: `cc_cookie`, 182 days, consent revision 2.
- Analytics: off by default; loads the existing GTM container only after permission. Google Analytics cookie cleanup rules apply if those cookies exist.
- Google Maps: separately opt-in; replaces the contact-page placeholder when allowed.
- Advertising storage, user data and personalization always stay denied. No copied marketing, Meta or Clarity categories are included.
- No embedded third-party video/social widgets; enquiry forms post through the server to Google Forms.

## GTM owner checks

Require `analytics_storage` for every measurement tag, including custom HTML. Disable advertising tags or ensure their appropriate ad-consent checks prevent firing. The repository cannot inspect the container or verify which vendor cookies it currently creates. Keep the policies aligned with any future container changes.

If tags need to start when consent changes after GTM is running, use `cookie_consent_updated` with the required consent checks and avoid duplicate page-view triggers. Bump the consent revision for changes to purposes or categories.

## Deployment checks

No browser testing was performed, as requested. Check fresh storage, Accept, Reject, category selection, persistence, footer preferences and withdrawal on mobile and desktop. Before permission there should be no GTM or Maps request. Maps-only permission must not load GTM. Analytics-only permission must keep all advertising signals denied. On withdrawal, accessible matching analytics cookies are cleared and loaded tracking is removed through a reload. Third-party-domain cookies cannot be deleted by this website.

Business-side retention, access to Google Sheets, actual container contents and provider settings require owner confirmation. No external tags or legal guarantees are implied by these checks.
