import React from 'react';
import { Box, Typography, Container, Grid, Card, CardHeader, CardContent, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { SEO } from '../utils/seo.jsx';

// Gebruik directe URL voor de asset
const trainingImg = '/assets/nedrlands-en-wiskunde-toetsing.jpg';

function LLO() {
  return (
    <Box>
      <SEO 
        title="LLO & APK Keuzedeel | Hofmans Automotive Academie"
        description="Blijf leren met onze Leven Lang Ontwikkelen programma's en specialiseer je met het APK keuzedeel bij Hofmans Automotive Academie."
        keywords="LLO, APK keuzedeel, automotive onderwijs, Hofmans Automotive Academie"
        image="/assets/logo-hofmans.png"
        url="https://hofmansautomotiveacademie.github.io/llo"
      />
      <Box sx={{ background: 'linear-gradient(to right, #1e3a8a, #3b82f6)', color: 'white', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden', marginBottom: 5 }}>
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: `url(${trainingImg}) no-repeat center center/cover`, 
          opacity: 0.2, 
          zIndex: 0 
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            LLO & APK Keuzedeel
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            Blijf leren met onze Leven Lang Ontwikkelen programma's en specialiseer je met het APK keuzedeel. Perfect voor professionals die up-to-date willen blijven.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ padding: '80px 0' }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, height: '100%', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' } }}>
              <CardHeader
                avatar={<SchoolIcon sx={{ fontSize: 60, color: 'primary.main', marginBottom: 2 }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Leven Lang Ontwikkelen</Typography>}
                sx={{ paddingBottom: 0 }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                  Onze LLO-programma's zijn ontworpen om je vaardigheden continu te verbeteren en aan te passen aan de veranderende eisen van de automotive sector.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, height: '100%', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' } }}>
              <CardHeader
                avatar={<SchoolIcon sx={{ fontSize: 60, color: 'primary.main', marginBottom: 2 }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>APK Keuzedeel</Typography>}
                sx={{ paddingBottom: 0 }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                  Specialiseer je in APK-keuringen met ons uitgebreide keuzedeel. Leer alles wat je nodig hebt om een gecertificeerde APK-keurmeester te worden.
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

export default LLO;
