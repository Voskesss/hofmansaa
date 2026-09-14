/**
 * Utility functie om asset URLs te genereren.
 * Onder Next.js is de base altijd '/' — assets staan in /public.
 */
export function getAssetPath(assetPath) {
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  return `/${cleanPath}`;
}
