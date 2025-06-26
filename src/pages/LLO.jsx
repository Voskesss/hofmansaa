import React from 'react';
import { Typography, Box, Grid, Card, CardHeader, CardContent } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import TrainingPageTemplate from '../components/training/TrainingPageTemplate';

// Gebruik directe URL voor de asset
const trainingImg = '/assets/nedrlands-en-wiskunde-toetsing.jpg';

function LLO() {
  // Hoofdinhoud van de training
  const mainContent = (
    <>
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
        Over onze Leven Lang Ontwikkelen (LLO) trainingen
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Onze Leven Lang Ontwikkelen (LLO) programma's zijn speciaal ontwikkeld voor professionals in de automotive sector die hun kennis en vaardigheden willen blijven ontwikkelen. In een snel veranderende branche is het essentieel om bij te blijven met de nieuwste ontwikkelingen.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Of je nu je huidige expertise wilt uitbreiden of een nieuwe specialisatie wilt ontwikkelen, onze trainingen bieden een praktijkgerichte aanpak die direct toepasbaar is in je dagelijkse werk.
      </Typography>
      <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>
        Wat leert u tijdens deze trainingen?
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Nieuwste technologieën en technieken in de automotive sector
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Nieuwe technieken en innovaties in de automotive sector
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Specialistische vaardigheden voor je huidige of toekomstige functie
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Voorbereiding op diverse certificeringen in de automotive branche
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Praktijkgerichte oefeningen en casussen uit de dagelijkse praktijk
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
              avatar={<SchoolIcon sx={{ fontSize: 45, color: 'primary.main' }} />}
              title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Leven Lang Ontwikkelen</Typography>}
              sx={{ paddingBottom: 0, paddingLeft: 0 }}
            />
            <CardContent sx={{ paddingLeft: 0 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                Onze LLO-programma's zijn ontworpen om je vaardigheden continu te verbeteren en aan te passen aan de veranderende eisen van de automotive sector.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 'none', bgcolor: 'transparent' }}>
            <CardHeader
              avatar={<SchoolIcon sx={{ fontSize: 45, color: 'primary.main' }} />}
              title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Continu Ontwikkelen</Typography>}
              sx={{ paddingBottom: 0, paddingLeft: 0 }}
            />
            <CardContent sx={{ paddingLeft: 0 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                Blijf je ontwikkelen met onze uitgebreide modules. Leer alles wat je nodig hebt om een voorloper te blijven in de snel veranderende automotive sector.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  return (
    <TrainingPageTemplate
      title="Leven Lang Ontwikkelen (LLO)"
      description="Blijf leren met onze Leven Lang Ontwikkelen programma's bij Hofmans Automotive Academie. Perfect voor professionals die up-to-date willen blijven."
      keywords="LLO, Leven Lang Ontwikkelen, automotive onderwijs, Hofmans Automotive Academie"
      imageUrl={trainingImg}
      url="https://hofmansautomotiveacademie.nl/llo"
      trainingId="llo"
      subtitle="Blijf leren met onze Leven Lang Ontwikkelen programma's. Perfect voor professionals die up-to-date willen blijven in de automotive sector."
      mainContent={mainContent}
      additionalContent={additionalContent}
    />
  );
}

export default LLO;
