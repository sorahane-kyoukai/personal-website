/**
 * Generates the full URL for a static asset, accounting for the Vite base path.
 * @param path The path to the asset (e.g., '/images/logo.webp' or 'images/logo.webp')
 * @returns The full URL including the base path
 */
export const getAssetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};
