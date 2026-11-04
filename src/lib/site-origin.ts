type Environment = Record<string, string | undefined>;

const previewFallback = "https://vaidehicraft.vercel.app";

export function resolveSiteOrigin(value?: string) {
  const configured = value?.trim();
  if (!configured) return undefined;
  let url: URL;
  try { url = new URL(configured); } catch { throw new Error("The site URL must be a complete http(s) origin."); }
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("The site URL must contain only an http(s) scheme and hostname, with no credentials, path, query or fragment.");
  }
  return url.origin;
}

function hostnameOrigin(value?: string) {
  if (!value?.trim()) return undefined;
  return resolveSiteOrigin(value.includes("://") ? value : `https://${value}`);
}

/** Resolve once at build time so pages, social tags, schema and sitemap agree. */
export function resolveSiteConfiguration(env: Environment) {
  const configured = resolveSiteOrigin(env.NEXT_PUBLIC_SITE_URL?.trim() || env.SITE_URL);
  let productionOrigin: string | undefined;
  let deploymentOrigin: string | undefined;
  let preview = env.NODE_ENV === "development";

  const vercelEnvironment = env.VERCEL_ENV || env.NEXT_PUBLIC_VERCEL_ENV;
  if (env.VERCEL === "1" || vercelEnvironment || env.VERCEL_PROJECT_PRODUCTION_URL || env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL || env.NEXT_PUBLIC_VERCEL_URL) {
    deploymentOrigin = hostnameOrigin(env.VERCEL_URL || env.NEXT_PUBLIC_VERCEL_URL);
    const mainOrigin = hostnameOrigin(env.VERCEL_PROJECT_PRODUCTION_URL || env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL);
    preview ||= Boolean(vercelEnvironment && vercelEnvironment !== "production");
    if (vercelEnvironment === "production") productionOrigin = mainOrigin || previewFallback;
    deploymentOrigin ||= mainOrigin;
  } else if (env.NETLIFY === "true") {
    deploymentOrigin = resolveSiteOrigin(env.DEPLOY_PRIME_URL || env.DEPLOY_URL || env.URL);
    preview ||= env.CONTEXT !== "production" || env.NETLIFY_PREVIEW_SERVER === "true";
    if (!preview) productionOrigin = resolveSiteOrigin(env.URL);
  } else if (env.RENDER === "true") {
    deploymentOrigin = resolveSiteOrigin(env.RENDER_EXTERNAL_URL) || hostnameOrigin(env.RENDER_EXTERNAL_HOSTNAME);
    preview ||= env.IS_PULL_REQUEST === "true";
    if (!preview) productionOrigin = deploymentOrigin;
  }

  return {
    siteOrigin: preview ? undefined : configured || productionOrigin,
    metadataOrigin: configured || productionOrigin || deploymentOrigin || previewFallback,
  };
}
