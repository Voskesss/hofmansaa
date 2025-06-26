import React from 'react';
import { Typography, Box, Grid, Card, CardHeader, CardContent } from '@mui/material';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import TrainingPageTemplate from '../components/training/TrainingPageTemplate';

// Gebruik directe URL voor de asset
const automotiveImg = '/assets/voertuigtechniek.jpg';

function Voertuigtechniek() {
  // Hoofdinhoud van de training
  const mainContent = (
    <>
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
        Over onze voertuigtechniek trainingen
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Onze voertuigtechniek trainingen zijn speciaal ontwikkeld voor monteurs en technici die hun kennis willen verdiepen. Deze trainingen richten zich op de nieuwste technieken en technologieën in de automotive sector.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Of je nu een beginnende monteur bent of al jarenlange ervaring hebt, onze trainingen zijn afgestemd op verschillende niveaus van expertise en bieden waardevolle inzichten voor iedereen in het vak.
      </Typography>
      <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>
        Wat leert u tijdens deze trainingen?
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Diagnose en probleemoplossing bij moderne voertuigsystemen
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Werken met de nieuwste elektronische componenten
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Onderhoud en reparatie van hybride en elektrische voertuigen
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Geavanceerde motortechniek en emissiesystemen
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Werken met moderne diagnoseapparatuur
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
              avatar={<CarRepairIcon sx={{ fontSize: 45, color: 'primary.main' }} />}
              title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Praktische Trainingen</Typography>}
              sx={{ paddingBottom: 0, paddingLeft: 0 }}
            />
            <CardContent sx={{ paddingLeft: 0 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                Onze trainingen zijn hands-on en gericht op echte werkplaatssituaties. Je leert de nieuwste technieken en technologieën die direct toepasbaar zijn in je werk.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 'none', bgcolor: 'transparent' }}>
            <CardHeader
              avatar={<CarRepairIcon sx={{ fontSize: 45, color: 'primary.main' }} />}
              title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Voor Alle Niveaus</Typography>}
              sx={{ paddingBottom: 0, paddingLeft: 0 }}
            />
            <CardContent sx={{ paddingLeft: 0 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                Of je nu een beginnende monteur bent of al jarenlange ervaring hebt, onze trainingen zijn afgestemd op verschillende niveaus van expertise.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  return (
    <TrainingPageTemplate
      title="Voertuigtechniek Trainingen"
      description="Ontdek onze geavanceerde voertuigtechniek trainingen bij Hofmans Automotive Academie. Ideaal voor monteurs die hun expertise willen verdiepen."
      keywords="voertuigtechniek, automotive training, Hofmans Automotive Academie, monteurs training"
      imageUrl={automotiveImg}
      url="https://hofmansautomotiveacademie.nl/voertuigtechniek"
      trainingId="voertuigtechniek"
      subtitle="Onze geavanceerde trainingen richten zich op de nieuwste technieken in voertuigonderhoud en -reparatie. Ideaal voor monteurs die hun expertise willen verdiepen."
      mainContent={mainContent}
      additionalContent={additionalContent}
    />
  );
}

export default Voertuigtechniek;
