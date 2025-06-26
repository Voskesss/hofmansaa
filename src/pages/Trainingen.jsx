import React from 'react';
import { Box, Typography, Container, Grid, Card, CardHeader, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { SEO } from '../utils/seo.jsx';

function Trainingen() {
  return (
    <Box>
      <SEO 
        title="Trainingen | Hofmans Automotive Academie"
        description="Ontdek ons uitgebreide aanbod aan automotive trainingen bij Hofmans Automotive Academie. Van voertuigtechniek tot LLO en meer."
        keywords="automotive trainingen, voertuigtechniek, LLO, APK keuzedeel, Hofmans Automotive Academie"
        image="/assets/logo-hofmans.png"
        url="https://hofmansautomotiveacademie.github.io/trainingen"
      />
      <Box sx={{ background: 'linear-gradient(to right, #1e3a8a, #3b82f6)', color: 'white', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'url(https://hofmansautomotiveacademie.nl/wp-content/uploads/2023/11/Hofmans-Automotive-Academy-1024x683.jpg) no-repeat center center/cover', 
          opacity: 0.2, 
          zIndex: 0 
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            Onze Trainingen
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            Bij Hofmans Automotive Academie bieden we een breed scala aan trainingen en onderwijsprogramma's voor de automotive sector. Kies de training die bij jou past.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ padding: '80px 0' }}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' } }}>
              <CardHeader
                avatar={<SchoolIcon sx={{ fontSize: 60, color: 'primary.main', marginBottom: 2 }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Voertuigtechniek Werkplaats</Typography>}
                sx={{ paddingBottom: 0 }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                  Praktijkgerichte trainingen voor monteurs die hun vaardigheden willen verbeteren op het gebied van voertuigonderhoud en -reparatie.
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/voertuigtechniek" sx={{ marginTop: 2 }}>
                  Meer Informatie
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' } }}>
              <CardHeader
                avatar={<PeopleIcon sx={{ fontSize: 60, color: 'primary.main', marginBottom: 2 }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>LLO & APK Keuzedeel</Typography>}
                sx={{ paddingBottom: 0 }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                  Leven Lang Ontwikkelen programma's en specialisatie in APK-keuringen om je kennis up-to-date te houden.
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/llo" sx={{ marginTop: 2 }}>
                  Meer Informatie
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' } }}>
              <CardHeader
                avatar={<AssignmentIcon sx={{ fontSize: 60, color: 'primary.main', marginBottom: 2 }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Nederlands & Rekenen</Typography>}
                sx={{ paddingBottom: 0 }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                  Essentiële basisvaardigheden voor EVC-trajecten. Behaal het niveau dat nodig is voor de volgende stap in je carrière.
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/nederlands-rekenen" sx={{ marginTop: 2 }}>
                  Meer Informatie
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', marginTop: 8 }}>
          <Button variant="contained" color="secondary" size="large" href="/contact" sx={{ padding: '14px 40px', fontSize: '1.1rem' }}>
            Meld Je Aan Voor Een Training
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Trainingen;
