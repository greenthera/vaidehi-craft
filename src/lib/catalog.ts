import { categoryLabel } from "@/lib/product-categories";
import catalog from "@/data/products.json";

export const products = catalog;
export const collections = [
  { slug: "chairs", name: categoryLabel("chairs"), label: categoryLabel("chairs"), video: "/media/cane-chairs-collection.mp4" },
  { slug: "sofas", name: categoryLabel("sofas"), label: categoryLabel("sofas"), video: "/media/cane-sofas-collection.mp4" },
  { slug: "swings", name: categoryLabel("swings"), label: categoryLabel("swings"), video: "/media/cane-swings-collection.mp4" },
  { slug: "tables", name: categoryLabel("tables"), label: categoryLabel("tables"), video: "/media/cane-tables-collection.mp4" },
];
export function findProduct(slug: string) { return products.find((product) => product.slug === slug); }
export function findCollection(slug: string) { return collections.find((collection) => collection.slug === slug); }
