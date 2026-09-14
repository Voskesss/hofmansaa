import { Helmet } from 'react-helmet-async';

/**
 * Verbeterde SEO component met canonical tags en structured data
 * @param {Object} props - Component properties
 * @param {string} props.title - Paginatitel
 * @param {string} props.description - Meta beschrijving
 * @param {string} props.keywords - SEO keywords
 * @param {string} props.image - Afbeelding URL voor social media
 * @param {string} props.url - Canonieke URL van de pagina
 * @param {boolean} props.noindex - Optioneel, indien true wordt de pagina niet geïndexeerd
 * @param {string} props.type - Type pagina voor Schema.org (standaard 'WebPage')
 * @param {Object} props.schemaData - Extra schema data voor structured data
 * @param {Object} props.faqSchema - FAQ schema data voor FAQ pagina's
 */
export const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url = '/',
  noindex = false,
  type = 'WebPage',
  schemaData = {},
  faqSchema = null
}) => {
  // Basis domein voor absolute URL's
  const baseDomain = "https://hofmansautomotiveacademie.nl";
  
  // Volledige URL voor canonical en schema data
  const fullUrl = url?.startsWith('http') ? url : `${baseDomain}${url?.startsWith('/') ? url : `/${url}`}`;
  
  // Basis schema data voor alle pagina's
  const baseSchemaData = {
    "@context": "https://schema.org",
    "@type": type,
    "name": title,
    "description": description,
    "url": url?.startsWith('http') ? url : `${baseDomain}${url?.startsWith('/') ? url : `/${url}`}`,
    "image": image?.startsWith('http') ? image : `${baseDomain}${image?.startsWith('/') ? image : `/${image}`}`,
  };

  // Combineer basis schema met eventuele extra schema data
  const fullSchemaData = { ...baseSchemaData, ...schemaData };

  // Absolute image URL voor social media tags
  const fullImage = image?.startsWith('http') ? image : `${baseDomain}${image?.startsWith('/') ? image : `/${image}`}`;
  
  // Organisatie schema data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Hofmans Automotive Academie",
    "url": baseDomain,
    "logo": `${baseDomain}/assets/logo-hofmans.png`,
    "description": "Hofmans Automotive Academie biedt trainingen en L.L.O. onderwijs voor de automotive sector, inclusief keuzedeel APK, voertuigtechniek en meer.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Boskantse Broekstraat 3",
      "addressLocality": "Wijchen",
      "postalCode": "6603 LD",
      "addressCountry": "NL"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@hofmansautomotiveacademie.nl",
      "availableLanguage": "Dutch"
    }
  };

  return (
    <Helmet>
      {/* Basis meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Robots meta tag voor indexering controle */}
      {noindex ? 
        <meta name="robots" content="noindex, nofollow" /> : 
        <meta name="robots" content="index, follow" />
      }
      
      {/* Open Graph tags voor social media */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Hofmans Automotive Academie" />
      <meta property="og:locale" content="nl_NL" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Structured Data / Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(fullSchemaData)}
      </script>
      
      {/* Organisatie schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* FAQ schema (indien beschikbaar) */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
};

/**
 * Standaard SEO waarden voor de website
 */
export const defaultSEO = {
  title: 'Hofmans Automotive Academie | Trainingen & Onderwijs',
  description: 'Hofmans Automotive Academie biedt trainingen en L.L.O. onderwijs voor de automotive sector, inclusief keuzedeel APK, voertuigtechniek en meer.',
  keywords: 'automotive training, APK keuzedeel, voertuigtechniek, LLO onderwijs, Hofmans Automotive Academie, Nederlands en rekenen toetsing, automotive opleiding, automotive cursus',
  image: '/assets/logo-hofmans.png',
  url: '/',
};
