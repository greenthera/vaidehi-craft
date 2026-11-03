import catalog from "@/data/products.json";

export const products = catalog;
export const collections = [
  { slug: "chairs", name: "Cane Chairs", label: "Chair", video: "/media/cane-chairs-collection.mp4" },
  { slug: "sofas", name: "Cane Sofas", label: "Sofa", video: "/media/cane-sofas-collection.mp4" },
  { slug: "swings", name: "Cane Swings", label: "Swing", video: "/media/cane-swings-collection.mp4" },
  { slug: "tables", name: "Cane Tables", label: "Table", video: "/media/cane-tables-collection.mp4" },
];
export function findProduct(slug: string) { return products.find((product) => product.slug === slug); }
export function findCollection(slug: string) { return collections.find((collection) => collection.slug === slug); }
