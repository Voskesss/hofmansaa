import React from 'react';
import { Box, Typography, Container, Grid, Card, CardHeader, CardContent, Button } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { SEO } from '../utils/seo.jsx';

// Gebruik directe URL voor de asset
const nederlandsRekenenImg = '/assets/nedrlands-en-wiskunde-toetsing (1).jpg';

function NederlandsRekenen() {
  return (
    <Box>
      <SEO 
        title="Nederlands & Rekenen Trainingen | Hofmans Automotive Academie"
        description="Essentiële basisvaardigheden voor EVC-trajecten met onze Nederlands en Rekenen trainingen en toetsingen bij Hofmans Automotive Academie."
        keywords="Nederlands training, Rekenen training, EVC-trajecten, Hofmans Automotive Academie"
        image="/assets/logo-hofmans.png"
        url="https://hofmansautomotiveacademie.github.io/nederlands-rekenen"
      />
      <Box sx={{ background: 'linear-gradient(to right, #1e3a8a, #3b82f6)', color: 'white', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden', marginBottom: 5 }}>
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: `url(${nederlandsRekenenImg}) no-repeat center center/cover`, 
          opacity: 0.2, 
          zIndex: 0 
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            Nederlands & Rekenen Trainingen
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            Essentiële basisvaardigheden voor EVC-trajecten. Met onze trainingen en toetsingen behaal je het niveau dat nodig is voor de volgende stap in je carrière.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ padding: '80px 0' }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, height: '100%', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' } }}>
              <CardHeader
                avatar={<AssignmentIcon sx={{ fontSize: 60, color: 'primary.main', marginBottom: 2 }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Basisvaardigheden Verbeteren</Typography>}
                sx={{ paddingBottom: 0 }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                  Onze trainingen richten zich op het verbeteren van je Nederlands en rekenvaardigheden, essentieel voor elk EVC-traject en professionele groei.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, height: '100%', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' } }}>
              <CardHeader
                avatar={<AssignmentIcon sx={{ fontSize: 60, color: 'primary.main', marginBottom: 2 }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Toetsing en Certificering</Typography>}
                sx={{ paddingBottom: 0 }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                  Na de training bieden we uitgebreide toetsingen aan om je niveau te bepalen en certificeringen te behalen die je carrière vooruit helpen.
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

export default NederlandsRekenen;
