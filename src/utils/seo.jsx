import { Helmet } from 'react-helmet-async';

export const SEO = ({ title, description, keywords, image, url }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export const defaultSEO = {
  title: 'Hofmans Automotive Academie | Trainingen & Onderwijs',
  description: 'Hofmans Automotive Academie biedt trainingen en L.L.O. onderwijs voor de automotive sector, inclusief keuzedeel APK, voertuigtechniek en meer.',
  keywords: 'automotive training, APK keuzedeel, voertuigtechniek, LLO onderwijs, Hofmans Automotive Academie, Nederlands en rekenen toetsing',
  image: '/assets/logo-hofmans.png',
  url: 'https://hofmansautomotiveacademie.github.io',
};
