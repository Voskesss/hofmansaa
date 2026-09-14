import React from 'react';
import { Suspense } from 'react';
import Providers from './providers';
import JsonLd, { organizationSchema } from './JsonLd';
import '../src/index.css';

export const metadata = {
  metadataBase: new URL('https://hofmansautomotiveacademie.nl'),
  title: {
    default: 'Hofmans Automotive Academie | Trainingen & MBO Examens',
    template: '%s',
  },
  description:
    'Geaccrediteerd instituut voor automotive trainingen en officiële MBO taal- en rekenexamens (Nederlands, Engels, Rekenen) via EVC. Gevestigd in Wijchen.',
  icons: {
    icon: '/assets/favicicon.png',
    apple: '/assets/favicicon.png',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  openGraph: {
    siteName: 'Hofmans Automotive Academie',
    locale: 'nl_NL',
    type: 'website',
  },
  alternates: {
    types: {
      'text/plain': '/llms.txt',
      'application/json': '/training-data.json',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>
        <JsonLd data={organizationSchema} />
        <Suspense>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
