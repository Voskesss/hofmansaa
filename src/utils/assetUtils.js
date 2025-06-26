/**
 * Utility functie om asset URLs correct te genereren voor zowel lokale ontwikkeling als GitHub Pages
 * @param {string} assetPath - Het pad naar de asset, beginnend met een forward slash, bijv. '/assets/image.png'
 * @returns {string} - De volledige URL naar de asset
 */
export function getAssetPath(assetPath) {
  // Controleer of we in productie draaien (GitHub Pages)
  const isProduction = import.meta.env.PROD;
  
  // Voeg de base URL toe in productie
  return isProduction 
    ? `/hofmans-automotive-academie${assetPath}` 
    : assetPath;
}
