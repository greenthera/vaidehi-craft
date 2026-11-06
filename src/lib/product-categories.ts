export const productCategories = [
  { value: "sofas", label: "Sofas" },
  { value: "chairs", label: "Chairs" },
  { value: "tables", label: "Tables" },
  { value: "swings", label: "Swings" },
];

export function categoryLabel(value: string) {
  const category = productCategories.find((item) => item.value === value);
  if (!category) throw new Error(`Unknown furniture category: ${value}`);
  return category.label;
}
