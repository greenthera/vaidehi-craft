/** Keep customer-facing product labels concise without changing catalog identities. */
export function productDisplayName(name: string) {
  return name.replace(/\bCane\s+/g, "").trim();
}
