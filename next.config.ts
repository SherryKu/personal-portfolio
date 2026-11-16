import type { NextConfig } from "next";

// On GitHub Pages the site lives under /personal-portfolio; locally it lives at the root.
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const basePath = isGitHubActions ? "/personal-portfolio" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: isGitHubActions ? "/personal-portfolio/" : undefined,
  // Lets the page build correct links to files in /public (screenshots, résumé).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
