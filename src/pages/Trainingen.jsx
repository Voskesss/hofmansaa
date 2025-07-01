import React from 'react';
import { Box, Typography, Container, Grid, Card, CardHeader, CardContent, Button, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { motion } from 'framer-motion';
import { SEO } from '../utils/seo.jsx';
import { getAssetPath } from '../utils/assetUtils';

function Trainingen() {
  const theme = useTheme();
  
  // Animatie varianten
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  return (
    <Box>
      <SEO 
        title="Trainingen | Hofmans Automotive Academie"
        description="Ontdek ons uitgebreide aanbod aan automotive trainingen bij Hofmans Automotive Academie. Van voertuigtechniek tot Leven Lang Ontwikkelen en meer."
        keywords="automotive trainingen, voertuigtechniek, LLO, Leven Lang Ontwikkelen, Nederlands & Rekenen, Niet-Technisch Personeel, Hofmans Automotive Academie"
        image="/assets/logo-hofmans.png"
        url="https://hofmansautomotiveacademie.github.io/trainingen"
      />
      <Box sx={{ 
        background: `linear-gradient(135deg, ${theme.palette.primary.dark}E6, ${theme.palette.tertiary.main}D9, ${theme.palette.secondary.main}CC)`, 
        color: 'white', 
        padding: '80px 0', 
        textAlign: 'center', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: `url(${getAssetPath('/assets/trainingen-header.jpg')}) no-repeat center center/cover`, 
          opacity: 0.2, 
          zIndex: 0 
        }} />
        
        {/* Decoratieve elementen met de drie hoofdkleuren */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.4,
          background: `
            radial-gradient(circle at 10% 20%, ${theme.palette.primary.main}40 0%, transparent 20%),
            radial-gradient(circle at 90% 30%, ${theme.palette.secondary.main}40 0%, transparent 20%),
            radial-gradient(circle at 50% 80%, ${theme.palette.tertiary.main}40 0%, transparent 20%)
          `
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
        <Typography variant="h4" sx={{ mb: 5, textAlign: 'center', fontWeight: 700, position: 'relative' }}>
          <Box 
            component="span" 
            sx={{ 
              position: 'relative',
              color: 'primary.main',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '10%',
                width: '80%',
                height: '4px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.tertiary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '2px'
              }
            }}
          >
            Onze Specialistische Trainingen
          </Box>
        </Typography>
        
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <Card sx={{ 
                textAlign: 'center', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                position: 'relative',
                '&:hover': { 
                  transform: 'translateY(-8px)', 
                  boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '5px',
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.tertiary.main}, ${theme.palette.secondary.main})`,
                }
              }}>
                <CardHeader
                  avatar={<SchoolIcon sx={{ fontSize: 60, color: theme.palette.primary.main, marginBottom: 2 }} />}
                  title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Voertuigtechniek Werkplaats</Typography>}
                  sx={{ paddingBottom: 0 }}
                />
                <CardContent>
                  <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                    Praktijkgerichte trainingen voor monteurs die hun vaardigheden willen verbeteren op het gebied van voertuigonderhoud en -reparatie.
                  </Typography>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to="/voertuigtechniek" 
                    sx={{ 
                      marginTop: 2,
                      py: 1.2,
                      borderRadius: '8px',
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '1rem',
                      bgcolor: theme.palette.primary.main,
                      boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark,
                        boxShadow: `0 6px 16px ${theme.palette.primary.main}66`,
                      }
                    }}
                  >
                    Meer Informatie
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' } }}>
              <CardHeader
                avatar={<PeopleIcon sx={{ fontSize: 60, color: 'primary.main', marginBottom: 2 }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Leven Lang Ontwikkelen (LLO)</Typography>}
                sx={{ paddingBottom: 0 }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                  Leven Lang Ontwikkelen programma's om je kennis en vaardigheden up-to-date te houden in de snel veranderende automotive sector.
                </Typography>
                <Button 
                  variant="contained" 
                  component={Link} 
                  to="/llo" 
                  sx={{ 
                    marginTop: 2,
                    py: 1.2,
                    borderRadius: '8px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    bgcolor: theme.palette.primary.main,
                    boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                      boxShadow: `0 6px 16px ${theme.palette.primary.main}66`,
                    }
                  }}
                >
                  Meer Informatie
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <Card sx={{ 
                textAlign: 'center', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                position: 'relative',
                '&:hover': { 
                  transform: 'translateY(-8px)', 
                  boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '5px',
                  background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main}, ${theme.palette.tertiary.main})`,
                }
              }}>
                <CardHeader
                  avatar={<AssignmentIcon sx={{ fontSize: 60, color: theme.palette.primary.main, marginBottom: 2 }} />}
                  title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Nederlands & Rekenen</Typography>}
                  sx={{ paddingBottom: 0 }}
                />
                <CardContent>
                  <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                    Essentiële basisvaardigheden voor EVC-trajecten. Behaal het niveau dat nodig is voor de volgende stap in je carrière.
                  </Typography>
                  <Button 
                    variant="contained"
                    component={Link} 
                    to="/nederlands-rekenen" 
                    sx={{ 
                      marginTop: 2,
                      py: 1.2,
                      borderRadius: '8px',
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '1rem',
                      bgcolor: theme.palette.primary.main,
                      boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark,
                        boxShadow: `0 6px 16px ${theme.palette.primary.main}66`,
                      }
                    }}
                  >
                    Meer Informatie
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Niet-Technisch Personeel training toevoegen */}
        <Grid container spacing={6} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <Card sx={{ 
                textAlign: 'center', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                position: 'relative',
                '&:hover': { 
                  transform: 'translateY(-8px)', 
                  boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '5px',
                  background: `linear-gradient(90deg, ${theme.palette.tertiary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                }
              }}>
                <CardHeader
                  avatar={<PeopleIcon sx={{ fontSize: 60, color: theme.palette.primary.main, marginBottom: 2 }} />}
                  title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Niet-Technisch Personeel</Typography>}
                  sx={{ paddingBottom: 0 }}
                />
                <CardContent>
                  <Typography variant="body1" color="text.secondary" sx={{ padding: 2, lineHeight: 1.6 }}>
                    Trainingen voor receptie, verkoop en management. Verbeter je kennis van voertuigtechniek zonder zelf sleutelaar te worden.
                  </Typography>
                  <Button 
                    variant="contained"
                    component={Link} 
                    to="/niet-technisch" 
                    sx={{ 
                      marginTop: 2,
                      py: 1.2,
                      borderRadius: '8px',
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '1rem',
                      bgcolor: theme.palette.primary.main,
                      boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark,
                        boxShadow: `0 6px 16px ${theme.palette.primary.main}66`,
                      }
                    }}
                  >
                    Meer Informatie
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <motion.div
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                p: 3, 
                borderRadius: '16px',
                background: `linear-gradient(135deg, white, white, ${theme.palette.secondary.light}15)`,
                border: `1px solid ${theme.palette.secondary.light}30`,
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '200px',
                  height: '200px',
                  background: `radial-gradient(circle at bottom right, ${theme.palette.primary.light}15, transparent 70%)`,
                  zIndex: 0
                }
              }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.primary.main, position: 'relative', zIndex: 1 }}>
                Waarom kiezen voor Hofmans Automotive Academie?
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ mr: 2, color: 'primary.main', fontWeight: 'bold', fontSize: '1.2rem' }}>✓</Box>
                    <Typography>Praktijkgerichte trainingen</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ mr: 2, color: 'primary.main', fontWeight: 'bold', fontSize: '1.2rem' }}>✓</Box>
                    <Typography>Ervaren docenten uit de praktijk</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 2, color: 'primary.main', fontWeight: 'bold', fontSize: '1.2rem' }}>✓</Box>
                    <Typography>Kleine groepen voor persoonlijke aandacht</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ mr: 2, color: 'primary.main', fontWeight: 'bold', fontSize: '1.2rem' }}>✓</Box>
                    <Typography>Modern lesmateriaal en faciliteiten</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ mr: 2, color: 'primary.main', fontWeight: 'bold', fontSize: '1.2rem' }}>✓</Box>
                    <Typography>Flexibele planning mogelijk</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 2, color: 'primary.main', fontWeight: 'bold', fontSize: '1.2rem' }}>✓</Box>
                    <Typography>Direct toepasbaar in de praktijk</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>
            </motion.div>
          </Grid>
        </Grid>
        
        <Box sx={{ textAlign: 'center', marginTop: 8 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button 
              variant="contained" 
              component={Link}
              to="/contact" 
              size="large" 
              sx={{ 
                padding: '14px 40px', 
                fontSize: '1.1rem',
                borderRadius: '12px',
                fontWeight: 600,
                textTransform: 'none',
                bgcolor: theme.palette.secondary.main,
                boxShadow: `0 6px 16px ${theme.palette.secondary.main}40`,
                '&:hover': {
                  bgcolor: theme.palette.secondary.dark,
                  boxShadow: `0 8px 20px ${theme.palette.secondary.main}66`,
                }
              }}
            >
              Meld Je Aan Voor Een Training
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}

export default Trainingen;
