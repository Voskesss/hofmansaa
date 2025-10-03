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
        Taal- en Rekentoetsen voor EVC
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Als u met uw Ervaringscertificaat een MBO-diploma wilt aanvragen, dan zijn de taal- en rekentoetsen verplicht. Wij kunnen deze toetsen voor u organiseren.
      </Typography>
      
      <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>
        Taaltoetsen Nederlands en Engels
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        De taaltoetsen Nederlands en Engels bestaan beide uit 5 onderdelen:
      </Typography>
      <Box component="ul" sx={{ pl: 2, mb: 3 }}>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Lezen en Luisteren (Centrale Examens)
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Schrijven (Instellingsexamen)
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Spreken en Gesprekken voeren (Instellingsexamens)
        </Typography>
      </Box>
      
      <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>
        Centraal Examen Rekenen
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Het Centraal Examen Rekenen wordt digitaal afgenomen en de volgende onderdelen komen aan bod:
      </Typography>
      <Box component="ul" sx={{ pl: 2, mb: 3 }}>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Getallen
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Verhoudingen
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Meten en Meetkunde
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Verbanden
        </Typography>
      </Box>
      
      <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>
        Verplichte toetsen per niveau
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>MBO 2 en 3:</strong> Verplichte taaltoets Nederlands en rekentoets (2F)
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>MBO 4:</strong> Verplichte taaltoetsen Nederlands (3F) en Engels (A2-B1) en rekentoets (3F)
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>HBO:</strong> Geen verplichte taal- en rekentoetsen
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
              title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Erkende Toetsing</Typography>}
              sx={{ paddingBottom: 0, paddingLeft: 0 }}
            />
            <CardContent sx={{ paddingLeft: 0 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                Onze toetsingen zijn officieel erkend en noodzakelijk voor het verkrijgen van uw MBO-diploma via een EVC-traject.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 'none', bgcolor: 'transparent' }}>
            <CardHeader
              avatar={<AssignmentIcon sx={{ fontSize: 45, color: 'primary.main' }} />}
              title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Professionele Begeleiding</Typography>}
              sx={{ paddingBottom: 0, paddingLeft: 0 }}
            />
            <CardContent sx={{ paddingLeft: 0 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                Wij organiseren de complete toetsing voor u en begeleiden u door het hele proces naar uw MBO-diploma.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  return (
    <TrainingPageTemplate
      title="Taal- en Rekentoetsen | Nederlands & Rekenen"
      description="Officiële taal- en rekentoetsen voor EVC-trajecten bij Hofmans Automotive Academie. Verplicht voor MBO 2, 3 en 4 diploma aanvraag."
      keywords="Nederlands toets, Rekenen toets, EVC-trajecten, MBO diploma, taaltoets, rekentoets, Hofmans Automotive Academie"
      imageUrl={nederlandsRekenenImg}
      url="https://hofmansautomotiveacademie.nl/nederlands-rekenen"
      trainingId="nederlands-rekenen"
      subtitle="Officiële taal- en rekentoetsen voor uw EVC-traject. Verplicht voor MBO 2, 3 en 4 diploma aanvraag. Wij organiseren de complete toetsing voor u."
      mainContent={mainContent}
      additionalContent={additionalContent}
      isToetsing={true}
    />
  );
}

export default NederlandsRekenen;
