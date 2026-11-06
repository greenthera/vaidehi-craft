import Link from "next/link";
import { PolicyPage } from "@/components/policy-page";
import { CookieSettings } from "@/components/cookie-consent";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Privacy Policy", "How Vaidehi Craft handles quote enquiries, contact permissions, cookies and Google Maps on this website.", "/privacy-policy");

export default function PrivacyPolicy() {
  return <PolicyPage title="Privacy policy." description="How we use the information you share with Vaidehi Craft.">
    <section><h2>Information we collect</h2><p>Our quote forms collect your first name, email address, phone number, and selected furniture categories and products. The general quote form also accepts an optional message. We record the source page, your form confirmation, and the submission time with your enquiry.</p></section>
    <section><h2>How we use your details</h2><p>We use your details to respond to enquiries, discuss furniture, and prepare quotations. On the general Request a Quote page, we ask for your agreement to use your contact details for marketing and calls. Product-specific quote forms ask you to confirm your details are correct.</p></section>
    <section><h2>Enquiry records</h2><p>Your enquiry is processed through our server and stored using third-party form-processing and storage services for our team to review. The website does not automatically delete enquiry records after a fixed period. Contact us with questions about information you have submitted.</p></section>
    <section><h2>Cookies and analytics</h2><p>Our preference cookie remembers your choices for 182 days. Analytics is off until you accept it. Google Tag Manager loads only after analytics permission; advertising consent remains denied.</p><p>You can change analytics preferences using Cookie settings. Read our <Link href="/cookie-policy">Cookie Policy</Link> for details.</p><CookieSettings /></section>
    <section><h2>Maps and external services</h2><p>Google Maps loads on the contact page as an always-enabled service. It shares connection information with Google, which may use its own cookies. WhatsApp, social-media, and external map links open services with their own privacy policies.</p><p>Our hosting and service providers also process technical information needed to deliver the website and handle requests, such as IP addresses and browser details.</p></section>
  </PolicyPage>;
}
