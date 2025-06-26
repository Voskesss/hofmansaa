import React from 'react';
import { Typography, Box, Grid, Card, CardHeader, CardContent } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrainingPageTemplate from '../components/training/TrainingPageTemplate';
import { getAssetPath } from '../utils/assetUtils';

// Gebruik de asset utility functie voor het afbeeldingspad
const nederlandsRekenenImg = getAssetPath('/assets/nedrlands-en-wiskunde-toetsing.jpg');

function NederlandsRekenen() {
  // Hoofdinhoud van de training
  const mainContent = (
    <>
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
        Over onze Nederlands & Rekenen trainingen
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Onze Nederlands & Rekenen trainingen zijn speciaal ontwikkeld voor professionals in de automotive sector die hun basisvaardigheden willen verbeteren. Deze trainingen zijn essentieel voor EVC-trajecten en vormen een belangrijke basis voor verdere professionele ontwikkeling.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Of je nu je taalvaardigheid wilt verbeteren of je rekenvaardigheden wilt opfrissen, onze trainingen bieden een praktijkgerichte aanpak die aansluit bij de dagelijkse praktijk in de automotive sector.
      </Typography>
      <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>
        Wat leert u tijdens deze trainingen?
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Effectieve communicatie in de werkplaats en met klanten
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Technische documentatie begrijpen en opstellen
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Rekenvaardigheid voor technische berekeningen
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Voorbereiding op EVC-toetsingen
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Praktijkgerichte oefeningen die aansluiten bij je werk
        </Typography>
      </Box>
    </>
  );

  // Extra inhoud van de training
  const additionalContent = (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 'none', bgcolor: 'transparent' }}>
            <CardHeader
              avatar={<AssignmentIcon sx={{ fontSize: 45, color: 'primary.main' }} />}
              title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Basisvaardigheden Verbeteren</Typography>}
              sx={{ paddingBottom: 0, paddingLeft: 0 }}
            />
            <CardContent sx={{ paddingLeft: 0 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                Onze trainingen richten zich op het verbeteren van je Nederlands en rekenvaardigheden, essentieel voor elk EVC-traject en professionele groei.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 'none', bgcolor: 'transparent' }}>
            <CardHeader
              avatar={<AssignmentIcon sx={{ fontSize: 45, color: 'primary.main' }} />}
              title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Toetsing en Certificering</Typography>}
              sx={{ paddingBottom: 0, paddingLeft: 0 }}
            />
            <CardContent sx={{ paddingLeft: 0 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                Na de training bieden we uitgebreide toetsingen aan om je niveau te bepalen en certificeringen te behalen die je carrière vooruit helpen.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  return (
    <TrainingPageTemplate
      title="Nederlands & Rekenen Trainingen"
      description="Essentiële basisvaardigheden voor EVC-trajecten met onze Nederlands en Rekenen trainingen en toetsingen bij Hofmans Automotive Academie."
      keywords="Nederlands training, Rekenen training, EVC-trajecten, Hofmans Automotive Academie"
      imageUrl={nederlandsRekenenImg}
      url="https://hofmansautomotiveacademie.nl/nederlands-rekenen"
      trainingId="nederlands-rekenen"
      subtitle="Essentiële basisvaardigheden voor EVC-trajecten. Met onze trainingen en toetsingen behaal je het niveau dat nodig is voor de volgende stap in je carrière."
      mainContent={mainContent}
      additionalContent={additionalContent}
    />
  );
}

export default NederlandsRekenen;
