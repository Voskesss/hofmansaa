import React from 'react';
import { Box, Typography, Container, Grid, Card, CardHeader, CardContent, Button } from '@mui/material';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import { SEO } from '../utils/seo.jsx';

// Gebruik directe URL voor de asset
const automotiveImg = '/assets/voertuigtechniek.jpg';

function Voertuigtechniek() {
  return (
    <Box>
      <SEO 
        title="Voertuigtechniek Trainingen | Hofmans Automotive Academie"
        description="Ontdek onze geavanceerde voertuigtechniek trainingen bij Hofmans Automotive Academie. Ideaal voor monteurs die hun expertise willen verdiepen."
        keywords="voertuigtechniek, automotive training, Hofmans Automotive Academie, monteurs training"
        image="/assets/logo-hofmans.png"
        url="https://hofmansautomotiveacademie.github.io/voertuigtechniek"
      />
      <Box sx={{ background: 'linear-gradient(to right, #1e3a8a, #3b82f6)', color: 'white', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden', marginBottom: 5 }}>
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: `url(${automotiveImg}) no-repeat center center/cover`, 
          opacity: 0.2, 
          zIndex: 0 
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            Voertuigtechniek Trainingen
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            Onze geavanceerde trainingen richten zich op de nieuwste technieken in voertuigonderhoud en -reparatie. Ideaal voor monteurs die hun expertise willen verdiepen.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ padding: '80px 0' }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, height: '100%', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' } }}>
              <CardHeader
                avatar={<CarRepairIcon sx={{ fontSize: 60, color: 'primary.main', marginBottom: 2 }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Praktische Trainingen</Typography>}
                sx={{ paddingBottom: 0 }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                  Onze trainingen zijn hands-on en gericht op echte werkplaatssituaties. Je leert de nieuwste technieken en technologieën die direct toepasbaar zijn in je werk.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, height: '100%', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' } }}>
              <CardHeader
                avatar={<CarRepairIcon sx={{ fontSize: 60, color: 'primary.main', marginBottom: 2 }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Voor Alle Niveaus</Typography>}
                sx={{ paddingBottom: 0 }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                  Of je nu een beginnende monteur bent of al jarenlange ervaring hebt, onze trainingen zijn afgestemd op verschillende niveaus van expertise.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', marginTop: 6 }}>
          <Button variant="contained" color="secondary" size="large" href="/contact" sx={{ padding: '14px 40px', fontSize: '1.1rem' }}>
            Meld Je Aan
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Voertuigtechniek;
