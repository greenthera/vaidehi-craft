import Link from "next/link";
import { PolicyPage } from "@/components/policy-page";
import { CookieSettings } from "@/components/cookie-consent";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Cookie Policy", "Learn about Vaidehi Craft’s cookie preferences, optional analytics, embedded maps and how to manage your choices.", "/cookie-policy");

export default function CookiePolicy() {
  return <PolicyPage title="Cookie policy." description="How this website uses cookies and remembers your choices.">
    <section><h2>Essential services</h2><p>A preference cookie remembers your cookie choices for 182 days. Contact-page maps are also included in the website’s always-enabled services. Embedded maps share connection information with an external provider, which may use its own cookies.</p></section>
    <section><h2>Analytics</h2><p>Analytics helps us understand how visitors use the website. It stays off until you accept it. You can browse the website and submit an enquiry without accepting analytics.</p></section>
    <section><h2>Manage your choices</h2><p>You can accept or reject analytics in the cookie dialog and change your choice using Cookie settings in the footer. Turning analytics off clears matching cookies the website can access and reloads the page if needed to stop loaded tracking. This does not remove cookies stored on an external provider’s domain.</p><CookieSettings /></section>
    <section><h2>Enquiry information</h2><p>Cookie choices are separate from the information you submit in an enquiry. Read our <Link href="/privacy-policy">Privacy Policy</Link> to learn how we use those details.</p></section>
  </PolicyPage>;
}
