"use client";

import { useState } from "react";
import products from "@/data/product-index.json";

const categories = [{ value: "sofas", label: "Sofa" }, { value: "chairs", label: "Chair" }, { value: "tables", label: "Table" }, { value: "swings", label: "Swing" }];

export function QuoteForm({ productSlug }: { productSlug?: string }) {
  const initial = products.find((product) => product.slug === productSlug);
  const [selected, setSelected] = useState(productSlug ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const product = products.find((item) => item.slug === selected);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!product) return;
    const data = new FormData(event.currentTarget);
    const message = [`Hello Vaidehi Craft, I'd like a quote for ${product.name}.`, `First name: ${data.get("name")}`, `Email: ${data.get("email")}`, `Phone: ${data.get("phone")}`, `Product category: ${categories.find((item) => item.value === product.category)?.label}`, "Please share dimensions, available finishes and a tailored quotation."].join("\n");
    const url = new URL("https://wa.me/919824177913");
    url.searchParams.set("text", message);
    window.location.assign(url.toString());
  }
  const field = "mt-2 min-h-12 w-full rounded-none border border-black/65 bg-white px-3 py-3 type-form-value text-black outline-offset-4";
  return <form onSubmit={submit} className="space-y-5 type-form-copy text-black">
    <h2 className="mb-7 type-form-title">Contact us</h2>
    <label className="block">First name <span aria-hidden="true">*</span><input required name="name" autoComplete="given-name" placeholder="First name" maxLength={120} className={field} /></label>
    <label className="block">Email <span aria-hidden="true">*</span><input required type="email" name="email" autoComplete="email" placeholder="Email" maxLength={200} className={field} /></label>
    <label className="block">Phone <span aria-hidden="true">*</span><input required type="tel" inputMode="tel" name="phone" autoComplete="tel" placeholder="Phone" maxLength={30} className={field} /></label>
    <fieldset><legend className="mb-2">Product Category <span aria-hidden="true">*</span></legend><div className="flex flex-wrap gap-x-5 gap-y-1">{categories.map((item) => <label key={item.value} className="flex min-h-11 cursor-pointer items-center gap-2"><input type="radio" name="category" value={item.value} required checked={category === item.value} disabled={Boolean(productSlug) && item.value !== initial?.category} onChange={() => { if (productSlug) return; setCategory(item.value); setSelected(""); }} className="size-4 accent-black" />{item.label}</label>)}</div></fieldset>
    <label className="block">Product Name <span aria-hidden="true">*</span>{productSlug ? <input name="product" readOnly value={product?.name ?? ""} className={field} /> : <select required name="product" value={selected} onChange={(event) => { setSelected(event.target.value); const next = products.find((item) => item.slug === event.target.value); if (next) setCategory(next.category); }} className={field}><option value="">Select a design</option>{products.filter((item) => !category || item.category === category).map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>}</label>
    <label className="flex min-h-11 cursor-pointer items-center gap-3"><input required type="checkbox" name="confirm" className="size-4 shrink-0 accent-black" /><span>Confirm <span aria-hidden="true">*</span><span className="sr-only"> that these contact and product details are correct.</span></span></label>
    <button type="submit" className="min-h-12 w-full cursor-pointer border border-black bg-black px-7 py-3 type-form-value text-white transition-colors hover:bg-white hover:text-black">Submit request</button>
    <p className="text-xs leading-5 text-neutral-600">This opens your request in WhatsApp. Review it and tap Send to contact Vaidehi Craft; nothing is sent automatically.</p>
  </form>;
}
