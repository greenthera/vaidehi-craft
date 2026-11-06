/** Prefix public assets when exporting below a repository path on GitHub Pages. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export function assetPath(path: string) {
  return path.startsWith("/") && !path.startsWith("//") && !path.startsWith(`${basePath}/`) ? `${basePath}${path}` : path;
}
