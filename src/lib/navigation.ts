import { categoryLabel } from "@/lib/product-categories";

export const navigation = [
  { label: "Home", href: "/" },
  { label: categoryLabel("sofas"), href: "/furniture/sofas" },
  { label: categoryLabel("chairs"), href: "/furniture/chairs" },
  { label: categoryLabel("swings"), href: "/furniture/swings" },
  { label: categoryLabel("tables"), href: "/furniture/tables" },
  { label: "Contact", href: "/contact" },
];
