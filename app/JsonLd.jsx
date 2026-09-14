// Server component: rendert schema.org JSON-LD direct in de HTML,
// zodat ook crawlers zonder JavaScript (AI-bots) de structured data zien.
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Hofmans Automotive Academie',
  url: 'https://hofmansautomotiveacademie.nl',
  logo: 'https://hofmansautomotiveacademie.nl/assets/logo-hofmans.png',
  description:
    'Geaccrediteerd instituut voor automotive trainingen en officiële MBO taal- en rekenexamens via EVC.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Boskantse Broekstraat 3',
    addressLocality: 'Wijchen',
    postalCode: '6603 LD',
    addressCountry: 'NL',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'support@hofmansautomotiveacademie.nl',
    availableLanguage: 'Dutch',
  },
  identifier: {
    '@type': 'PropertyValue',
    name: 'KVK nummer',
    value: '97469785',
  },
};
