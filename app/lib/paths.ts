/**
 * Links inside the site. On GitHub Pages the site lives under
 * /personal-portfolio, locally at the root; `href` adds whichever applies.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const href = (path: string) => `${basePath}${path}`;
