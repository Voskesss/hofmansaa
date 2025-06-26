import React from 'react';
import { Box, Typography, Container, Card, CardContent, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { SEO } from '../utils/seo.jsx';

function NietTechnisch() {
  return (
    <Box>
      <SEO 
        title="Trainingen Niet-Technisch Personeel | Hofmans Automotive Academie"
        description="Specialistische trainingen voor niet-technisch personeel in de automotive sector. Verbeter uw kennis en vaardigheden met onze professionele cursussen."
        keywords="niet-technisch personeel, automotive training, Hofmans Automotive Academie, service adviseur, receptie"
        image="/assets/logo-hofmans.png"
        url="https://hofmansautomotiveacademie.nl/training/trainingen-autmotive-niet-technisch-personeel/"
      />
      <Box sx={{ 
        background: 'linear-gradient(135deg, rgba(26, 75, 140, 0.9), rgba(37, 99, 235, 0.85))', 
        color: 'white', 
        padding: '80px 0 60px', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'url(/assets/voertuigtechniek.jpg) no-repeat center center/cover', 
          opacity: 0.2, 
          zIndex: 0 
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h1" sx={{ 
            fontWeight: 800, 
            marginBottom: 3, 
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            textAlign: 'center'
          }}>
            Trainingen Niet-Technisch Personeel
          </Typography>
          <Typography variant="h5" sx={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            lineHeight: 1.6, 
            marginBottom: 5,
            textAlign: 'center',
            opacity: 0.9
          }}>
            Professionele trainingen voor service adviseurs, receptionisten en andere niet-technische functies in de automotive sector.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card sx={{ 
              mb: 4, 
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                  Over onze trainingen voor niet-technisch personeel
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Onze trainingen voor niet-technisch personeel zijn speciaal ontwikkeld voor medewerkers in ondersteunende en klantgerichte functies binnen de automotive sector. Deze trainingen richten zich op het verbeteren van klantcommunicatie, service-excellentie en specifieke kennis die nodig is om effectief te werken in een technische omgeving.
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Of u nu werkzaam bent als service adviseur, receptionist(e), garantiespecialist of in een andere niet-technische functie, onze trainingen bieden u de tools en kennis om uw werk naar een hoger niveau te tillen.
                </Typography>
                <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>
                  Wat leert u tijdens deze trainingen?
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Effectieve communicatie met klanten en technici
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Basiskennis van voertuigtechniek voor niet-technici
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Klachtenafhandeling en klanttevredenheid
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Werkplaatsplanning en efficiëntie
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Garantieprocessen en administratie
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ 
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                  Voordelen van onze trainingen
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Onze trainingen worden gegeven door ervaren professionals uit de automotive sector die zowel de technische als de commerciële aspecten van het vak begrijpen. Dit zorgt voor een praktijkgerichte aanpak met direct toepasbare kennis.
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Praktijkgericht: direct toepasbaar in uw dagelijkse werkzaamheden
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Op maat: trainingen afgestemd op uw specifieke functie en behoeften
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Interactief: leren door te doen en ervaringen uit te wisselen
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Professioneel: gegeven door ervaren trainers met kennis van de branche
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
              mb: 4,
              position: 'sticky',
              top: 100
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                  Interesse in deze training?
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Meld u aan voor een van onze trainingen voor niet-technisch personeel en verbeter uw vaardigheden en kennis.
                </Typography>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large" 
                  component={Link} 
                  to="/contact" 
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600
                  }}
                >
                  Aanmelden
                </Button>
              </CardContent>
            </Card>

            <Card sx={{ 
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
              bgcolor: 'primary.main',
              color: 'white'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                  Meer informatie nodig?
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Neem contact met ons op voor meer informatie over onze trainingen voor niet-technisch personeel.
                </Typography>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  size="large" 
                  component={Link} 
                  to="/contact" 
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Contact opnemen
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default NietTechnisch;
