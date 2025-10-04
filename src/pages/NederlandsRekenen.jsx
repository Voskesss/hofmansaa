import React from 'react';
import { Typography, Box, Grid, Card, CardHeader, CardContent } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrainingPageTemplate from '../components/training/TrainingPageTemplate';
import { getAssetPath } from '../utils/assetUtils';

// Gebruik de asset utility functie voor het afbeeldingspad
const nederlandsRekenenImg = getAssetPath('/assets/nedrlands-en-wiskunde-toetsing.jpg');

function NederlandsRekenen() {
  // Hoofdinhoud van de toetsing
  const mainContent = (
    <>
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
        Nederlands & Rekenen Examens
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Wanneer u via een EVC-procedure uw MBO-diploma wilt behalen, moet u voldoen aan de taal- en rekeneisen. 
        Bij Hofmans Automotive Academie verzorgen wij de complete organisatie en afname van deze verplichte examens.
      </Typography>
      
      <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>
        Hoe zijn de taalexamens opgebouwd?
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Voor zowel Nederlands als Engels worden dezelfde vaardigheden getoetst, verdeeld over vijf examenonderdelen:
      </Typography>
      <Box component="ul" sx={{ pl: 2, mb: 3 }}>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Lezen en Luisteren</strong> - Centraal afgenomen examens
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Schrijven</strong> - Afgenomen door onze instelling
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Spreken en Gesprekken voeren</strong> - Afgenomen door onze instelling
        </Typography>
      </Box>
      
      <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>
        Wat toetst het rekenexamen?
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        U maakt het rekenexamen volledig digitaal. Tijdens dit centraal examen worden uw vaardigheden getest op vier hoofdgebieden:
      </Typography>
      <Box component="ul" sx={{ pl: 2, mb: 3 }}>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Getallen</strong> - Werken met gehele getallen, breuken en decimalen
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Verhoudingen</strong> - Percentages, schaalverdeling en evenredigheid
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Meten en Meetkunde</strong> - Lengtes, oppervlaktes, inhouden en vormen
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Verbanden</strong> - Grafieken, tabellen en formules interpreteren
        </Typography>
      </Box>
      
      <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>
        Welke toetsen zijn verplicht voor uw niveau?
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>MBO niveau 2 en 3:</strong> Nederlands (niveau 2F) en Rekenen (niveau 2F)
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>MBO niveau 4:</strong> Nederlands (niveau 3F), Engels (A2 tot B1) en Rekenen (niveau 3F)
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>HBO:</strong> Er gelden geen verplichte taal- en rekentoetsen
        </Typography>
      </Box>
    </>
  );

  // Extra inhoud van de toetsing
  const additionalContent = (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 'none', bgcolor: 'transparent' }}>
            <CardHeader
              avatar={<AssignmentIcon sx={{ fontSize: 45, color: 'primary.main' }} />}
              title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Officieel Geaccrediteerd</Typography>}
              sx={{ paddingBottom: 0, paddingLeft: 0 }}
            />
            <CardContent sx={{ paddingLeft: 0 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                Als geaccrediteerd exameninstituut verzorgen wij alle vereiste taal- en rekenexamens die u nodig heeft voor uw MBO-diplomering via EVC.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 'none', bgcolor: 'transparent' }}>
            <CardHeader
              avatar={<AssignmentIcon sx={{ fontSize: 45, color: 'primary.main' }} />}
              title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Van A tot Z Geregeld</Typography>}
              sx={{ paddingBottom: 0, paddingLeft: 0 }}
            />
            <CardContent sx={{ paddingLeft: 0 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                Van de eerste aanmelding tot en met de uitslag: wij begeleiden u persoonlijk bij elke stap richting uw diploma.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  // Structured data voor SEO (Course schema)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Nederlands & Rekenen Examens voor MBO",
    "description": "Officiële taal- en rekenexamens voor MBO-diploma via EVC. Wij verzorgen Nederlands, Engels en Rekenen toetsing voor niveau 2F en 3F.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Hofmans Automotive Academie",
      "url": "https://hofmansautomotiveacademie.nl",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Boskantse Broekstraat 3",
        "addressLocality": "Wijchen",
        "postalCode": "6603 LD",
        "addressCountry": "NL"
      },
      "telephone": "+31246413222",
      "email": "support@hofmansautomotiveacademie.nl"
    },
    "educationalLevel": "MBO niveau 2, 3 en 4",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "onsite",
      "location": {
        "@type": "Place",
        "name": "Hofmans Academie Utrecht",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Wijchen",
          "addressCountry": "NL"
        }
      }
    },
    "offers": {
      "@type": "Offer",
      "category": "Examens & Toetsing"
    },
    "keywords": "Nederlands examen MBO, Rekenen examen MBO, EVC toetsing, taaltoets 2F, taaltoets 3F, rekentoets 2F, rekentoets 3F, Engels A2 B1"
  };

  // FAQ Structured data voor veelgestelde vragen
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Welke taal- en rekentoetsen zijn verplicht voor MBO niveau 2 en 3?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Voor MBO niveau 2 en 3 zijn de volgende toetsen verplicht: Nederlands (niveau 2F) en Rekenen (niveau 2F)."
        }
      },
      {
        "@type": "Question",
        "name": "Welke examens moet ik doen voor MBO niveau 4?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Voor MBO niveau 4 zijn verplicht: Nederlands (niveau 3F), Engels (A2 tot B1) en Rekenen (niveau 3F)."
        }
      },
      {
        "@type": "Question",
        "name": "Uit welke onderdelen bestaat het rekenexamen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Het digitale rekenexamen toetst vier hoofdgebieden: Getallen (gehele getallen, breuken, decimalen), Verhoudingen (percentages, schaalverdeling), Meten en Meetkunde (lengtes, oppervlaktes, vormen) en Verbanden (grafieken, tabellen, formules)."
        }
      },
      {
        "@type": "Question",
        "name": "Hoe zijn de taalexamens Nederlands en Engels opgebouwd?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De taalexamens bestaan uit vijf onderdelen: Lezen en Luisteren (centraal afgenomen), Schrijven (door onze instelling), en Spreken en Gesprekken voeren (door onze instelling)."
        }
      }
    ]
  };

  return (
    <TrainingPageTemplate
      title="Nederlands & Rekenen Examens MBO | EVC Toetsing 2F & 3F"
      description="✓ Officiële MBO examens Nederlands, Engels & Rekenen ✓ Niveau 2F en 3F ✓ EVC Toetsing ✓ Geaccrediteerd instituut ✓ Bel 024-6413222 voor info"
      keywords="Nederlands examen MBO, Rekenen examen MBO, EVC toetsing, taaltoets 2F, taaltoets 3F, rekentoets 2F, rekentoets 3F, Engels examen A2 B1, MBO diploma halen, taal en rekenen EVC, Nederlands 3F examen, Rekenen 3F examen, centrale examens MBO"
      imageUrl={nederlandsRekenenImg}
      url="https://hofmansautomotiveacademie.nl/nederlands-rekenen"
      trainingId="nederlands-rekenen"
      subtitle="Haal uw MBO-diploma via EVC met onze geaccrediteerde taal- en rekenexamens. Voor MBO niveau 2, 3 en 4 verzorgen wij de volledige examenorganisatie en persoonlijke begeleiding."
      mainContent={mainContent}
      additionalContent={additionalContent}
      isToetsing={true}
      schemaData={structuredData}
      faqSchema={faqStructuredData}
    />
  );
}

export default NederlandsRekenen;
