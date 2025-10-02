/**
 * Utility functie om asset URLs correct te genereren voor lokaal, GitHub Pages en Vercel
 * @param {string} assetPath - Het pad naar de asset, beginnend met een forward slash, bijv. '/assets/image.png'
 * @returns {string} - De volledige URL naar de asset
 */
export function getAssetPath(assetPath) {
  // Vite's import.meta.env.BASE_URL wordt automatisch gezet door vite.config.js
  // Op Vercel: '/', op GitHub Pages: '/hofmansaa/', lokaal: '/'
  const basePath = import.meta.env.BASE_URL;
  
  // Verwijder leading slash van assetPath als die er is
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  
  // Combineer base met asset path
  const fullPath = `${basePath}${cleanPath}`;
  
  return fullPath;
}
