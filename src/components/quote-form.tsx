"use client";

import { useState } from "react";
import products from "@/data/product-index.json";

const categories = [{ value: "sofas", label: "Sofa" }, { value: "chairs", label: "Chair" }, { value: "tables", label: "Table" }, { value: "swings", label: "Swing" }];

export function QuoteForm({ productSlug, appearance = "classic" }: { productSlug?: string; appearance?: "classic" | "inquiry" }) {
  const inquiry = appearance === "inquiry";
  const initial = products.find((product) => product.slug === productSlug);
  const [selected, setSelected] = useState(productSlug ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const product = products.find((item) => item.slug === selected);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!product) return;
    const data = new FormData(event.currentTarget);
    const message = [`Hello Vaidehi Craft, I'd like a quote for ${product.name}.`, `First name: ${data.get("name")}`, `Email: ${data.get("email")}`, `Phone: ${data.get("phone")}`, `Product category: ${categories.find((item) => item.value === product.category)?.label}`, ...(String(data.get("message") ?? "").trim() ? [`Enquiry: ${String(data.get("message")).trim()}`] : []), "Please share dimensions, available finishes and a tailored quotation."].join("\n");
    const url = new URL("https://wa.me/919824177913");
    url.searchParams.set("text", message);
    window.location.assign(url.toString());
  }
  const field = `mt-2 min-h-12 w-full border bg-white px-3 py-3 type-form-value outline-offset-4 ${inquiry ? "rounded-lg border-[#b8b9ab] text-[#244536] placeholder:text-[#68726a] focus:border-[#244536]" : "rounded-none border-black/65 text-black"}`;
  return <form method="post" onSubmit={submit} className={`space-y-5 type-form-copy ${inquiry ? "text-[#244536]" : "text-black"}`}>
    <h2 className={inquiry ? "text-2xl leading-snug [font-family:var(--font-reference-heading)]" : "mb-7 type-form-title"}>{inquiry ? "Your enquiry" : "Contact us"}</h2>
    {inquiry && <p className="text-sm leading-6 text-[#526356]">Fields marked * are required.</p>}
    <noscript><p>Enable JavaScript to prepare your WhatsApp request, or <a href="tel:+919824177913" className="underline">call us directly</a>.</p></noscript>
    <div className={inquiry ? "grid gap-5 min-[640px]:grid-cols-2" : "space-y-5"}>
    <label className="block">First name <span aria-hidden="true">*</span><input required name="name" autoComplete="given-name" placeholder="First name" maxLength={120} className={field} /></label>
    <label className="block">Email <span aria-hidden="true">*</span><input required type="email" name="email" autoComplete="email" placeholder="Email" maxLength={200} className={field} /></label>
    <label className={inquiry ? "block min-[640px]:col-span-2" : "block"}>Phone <span aria-hidden="true">*</span><input required type="tel" inputMode="tel" name="phone" autoComplete="tel" placeholder="Phone" maxLength={30} className={field} /></label>
    </div>
    <fieldset><legend className="mb-2">Product Category <span aria-hidden="true">*</span></legend><div className="flex flex-wrap gap-x-5 gap-y-1">{categories.map((item) => <label key={item.value} className={inquiry ? "flex min-h-12 cursor-pointer items-center gap-2 rounded-lg border border-[#b8b9ab] bg-white px-3 has-checked:border-[#244536] has-checked:bg-[#e8ede5]" : "flex min-h-11 cursor-pointer items-center gap-2"}><input type="radio" name="category" value={item.value} required checked={category === item.value} disabled={Boolean(productSlug) && item.value !== initial?.category} onChange={() => { if (productSlug) return; setCategory(item.value); setSelected(""); }} className="size-4 accent-black" />{item.label}</label>)}</div></fieldset>
    <label className="block">Product Name <span aria-hidden="true">*</span>{productSlug ? <input name="product" readOnly value={product?.name ?? ""} className={field} /> : <select required name="product" value={selected} onChange={(event) => { setSelected(event.target.value); const next = products.find((item) => item.slug === event.target.value); if (next) setCategory(next.category); }} className={field}><option value="">Select a design</option>{products.filter((item) => !category || item.category === category).map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>}</label>
    {inquiry && <label className="block">Tell us about your space <span className="text-[#526356]">(optional)</span><textarea name="message" maxLength={1000} rows={4} placeholder="Preferred size, finish, quantity, or anything you would like us to know." className={`${field} resize-y leading-6`} /></label>}
    <label className="flex min-h-11 cursor-pointer items-center gap-3"><input required type="checkbox" name="confirm" className="size-4 shrink-0 accent-black" /><span>{inquiry ? "I confirm my contact and product details are correct." : "Confirm"} <span aria-hidden="true">*</span>{!inquiry && <span className="sr-only"> that these contact and product details are correct.</span>}</span></label>
    <button type="submit" className={`min-h-12 w-full cursor-pointer border px-7 py-3 type-form-value text-white transition-colors ${inquiry ? "rounded-lg border-[#244536] bg-[#244536] hover:bg-[#183b2e]" : "border-black bg-black hover:bg-white hover:text-black"}`}>{inquiry ? "Continue to WhatsApp" : "Submit request"}</button>
    <p className="text-xs leading-5 text-neutral-600">This opens your request in WhatsApp. Review it and tap Send to contact Vaidehi Craft; nothing is sent automatically.</p>
  </form>;
}
