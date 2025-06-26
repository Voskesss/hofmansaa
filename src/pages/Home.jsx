import React from 'react';
import { Box, Typography, Container, Grid, Card, CardHeader, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { SEO } from '../utils/seo.jsx';

// Gebruik directe URL's voor de assets
const automotiveImg = '/assets/voertuigtechniek.jpg';
const trainingImg = '/assets/nedrlands-en-wiskunde-toetsing.jpg';
const nederlandsRekenenImg = '/assets/nedrlands-en-wiskunde-toetsing (1).jpg';
const logo = '/assets/logo-hofmans.png';

function Home() {
  return (
    <Box>
      <SEO 
        title="Hofmans Automotive Academie | Trainingen & Onderwijs"
        description="Hofmans Automotive Academie biedt hoogwaardige trainingen en onderwijs voor de automotive sector. Ontdek ons aanbod en meld je aan."
        keywords="automotive training, Hofmans Automotive Academie, voertuigtechniek, APK keuzedeel"
        image="/assets/logo-hofmans.png"
        url="https://hofmansautomotiveacademie.github.io"
      />
      {/* Hero Section */}
      <Box sx={{ background: 'linear-gradient(to right, #1e3a8a, #3b82f6)', color: 'white', padding: '100px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'url(https://hofmansautomotiveacademie.nl/wp-content/uploads/2023/11/Hofmans-Automotive-Academy-1024x683.jpg) no-repeat center center/cover', 
          opacity: 0.2, 
          zIndex: 0,
          animation: 'moveBackground 15s ease-in-out infinite',
          '@keyframes moveBackground': {
            '0%': { backgroundPosition: 'center top' },
            '50%': { backgroundPosition: 'center bottom' },
            '100%': { backgroundPosition: 'center top' }
          }
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
            <img src={logo} alt="Hofmans Automotive Logo" style={{ height: '120px', maxWidth: '100%' }} />
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: 3, fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
            Hofmans Automotive Academie
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.6, marginBottom: 5 }}>
            Hoogwaardige trainingen en onderwijs voor de automotive sector. Van voertuigtechniek tot LLO-programma's, wij helpen u vooruit.
          </Typography>
          <Button variant="contained" color="secondary" size="large" href="/contact" sx={{ padding: '14px 40px', fontSize: '1.1rem' }}>
            Meld Je Aan
          </Button>
        </Container>
      </Box>
      {/* Content Section */}
      <Container maxWidth="lg" sx={{ padding: '60px 0' }}>
        <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: 6, fontWeight: 'bold', color: 'primary.main' }}>
          Onze Trainingen
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' } }}>
              <CardHeader
                avatar={<CarRepairIcon sx={{ color: 'primary.main', fontSize: 40 }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Voertuigtechniek</Typography>}
                sx={{ paddingBottom: 0 }}
              />
              <Box component="img" src={automotiveImg} alt="Voertuigtechniek" sx={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 1, marginBottom: 2, background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                  Onze geavanceerde trainingen richten zich op de nieuwste technieken in voertuigonderhoud en -reparatie. Ideaal voor monteurs die hun expertise willen verdiepen.
                </Typography>
              </CardContent>
              <Box sx={{ padding: 2 }}>
                <Button variant="contained" color="primary" component={Link} to="/voertuigtechniek" fullWidth sx={{ marginTop: 2 }}>
                  Meer Informatie
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' } }}>
              <CardHeader
                avatar={<SchoolIcon sx={{ color: 'primary.main', fontSize: 40 }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>LLO & APK Keuzedeel</Typography>}
                sx={{ paddingBottom: 0 }}
              />
              <Box component="img" src={trainingImg} alt="LLO & APK Keuzedeel" sx={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 1, marginBottom: 2, background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                  Blijf leren met onze Leven Lang Ontwikkelen programma's en specialiseer je met het APK keuzedeel. Perfect voor professionals die up-to-date willen blijven.
                </Typography>
              </CardContent>
              <Box sx={{ padding: 2 }}>
                <Button variant="contained" color="primary" component={Link} to="/llo" fullWidth sx={{ marginTop: 2 }}>
                  Meer Informatie
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' } }}>
              <CardHeader
                avatar={<AssignmentIcon sx={{ color: 'primary.main', fontSize: 40 }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Nederlands & Rekenen</Typography>}
                sx={{ paddingBottom: 0 }}
              />
              <Box component="img" src={nederlandsRekenenImg} alt="Nederlands & Rekenen" sx={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 1, marginBottom: 2, background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                  Essentiële basisvaardigheden voor EVC-trajecten. Met onze trainingen en toetsingen behaal je het niveau dat nodig is voor de volgende stap in je carrière.
                </Typography>
              </CardContent>
              <Box sx={{ padding: 2 }}>
                <Button variant="contained" color="primary" component={Link} to="/nederlands-rekenen" fullWidth sx={{ marginTop: 2 }}>
                  Meer Informatie
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
