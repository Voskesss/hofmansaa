import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { SEO, defaultSEO } from '../utils/seo.jsx';
import automotiveImg from '/assets/voertuigtechniek.jpg';
import trainingImg from '/assets/nedrlands-en-wiskunde-toetsing.jpg';
import nederlandsRekenenImg from '/assets/nedrlands-en-wiskunde-toetsing (1).jpg';
import logo from '/assets/logo-hofmans.png';

function Home() {
  return (
    <Box>
      <SEO 
        title={defaultSEO.title} 
        description={defaultSEO.description} 
        keywords={defaultSEO.keywords} 
        image={defaultSEO.image} 
        url={defaultSEO.url} 
      />
      {/* Hero Section */}
      <Box sx={{ background: 'linear-gradient(to right, #1e3a8a, #3b82f6)', color: 'white', padding: '100px 0', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'url(https://hofmansautomotiveacademie.nl/wp-content/uploads/2023/11/Hofmans-Automotive-Academy-1024x683.jpg) no-repeat center center/cover', 
          opacity: 0.3, 
          zIndex: 0 
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
            <img src={logo} alt="Hofmans Automotive Logo" style={{ height: '120px', maxWidth: '100%' }} />
          </Box>
          <Typography variant="h1" sx={{ fontWeight: 'bold', marginBottom: 3, fontSize: { xs: '2.5rem', md: '4rem' } }}>
            Jouw Toekomst in Automotive Begint Hier
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 5, maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            Bij Hofmans Automotive Academie bieden wij hoogwaardige trainingen en L.L.O. onderwijs om jouw carrière in de automotive sector naar een hoger niveau te tillen.
          </Typography>
          <Button variant="contained" color="secondary" size="large" component={Link} to="/contact" sx={{ marginTop: 2, padding: '14px 30px', fontSize: '1.1rem' }}>
            Meld Je Nu Aan
          </Button>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ padding: '80px 0' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 6, color: 'primary.main' }}>
          Ontwikkel Jezelf met Hofmans
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 8, maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.7, color: 'text.primary' }}>
          Wij zijn toegewijd aan het ondersteunen van jouw professionele groei in de autotechniek. Of je nu een technische expert bent of een ondersteunende rol vervult, onze programma's zijn ontworpen om jouw vaardigheden te versterken.
        </Typography>

        <Grid container spacing={5} justifyContent="center" sx={{ marginTop: 5 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' } }}>
              <CardHeader
                avatar={<CarRepairIcon sx={{ fontSize: 60, color: 'primary.main', marginBottom: 2 }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Voertuigtechniek Trainingen</Typography>}
                sx={{ paddingBottom: 0 }}
              />
              <Box sx={{ height: '200px', overflow: 'hidden', margin: '16px 0' }}>
                <img src={automotiveImg} alt="Voertuigtechniek" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                  Onze geavanceerde trainingen richten zich op de nieuwste technieken in voertuigonderhoud en -reparatie. Ideaal voor monteurs die hun expertise willen verdiepen.
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
                avatar={<SchoolIcon sx={{ fontSize: 60, color: 'primary.main', marginBottom: 2 }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>LLO & APK Keuzedeel</Typography>}
                sx={{ paddingBottom: 0 }}
              />
              <Box sx={{ height: '200px', overflow: 'hidden', margin: '16px 0' }}>
                <img src={trainingImg} alt="Training" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                  Blijf leren met onze Leven Lang Ontwikkelen programma's en specialiseer je met het APK keuzedeel. Perfect voor professionals die up-to-date willen blijven.
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
              <Box sx={{ height: '200px', overflow: 'hidden', margin: '16px 0' }}>
                <img src={nederlandsRekenenImg} alt="Nederlands en Rekenen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                  Essentiële basisvaardigheden voor EVC-trajecten. Met onze trainingen en toetsingen behaal je het niveau dat nodig is voor de volgende stap in je carrière.
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/nederlands-rekenen" sx={{ marginTop: 2 }}>
                  Meer Informatie
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: 'center', marginTop: 12, marginBottom: 6, color: 'primary.main' }}>
          Trainingen voor de Hele Automotive Sector
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 8, maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.7, color: 'text.primary' }}>
          Van technische specialisten tot ondersteunend personeel, wij bieden op maat gemaakte trainingen om zowel technische als communicatieve vaardigheden te verbeteren. Investeer in jezelf en je team met Hofmans.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
          <Button variant="contained" color="primary" size="large" component={Link} to="/trainingen" sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}>
            Ontdek Onze Trainingen
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
