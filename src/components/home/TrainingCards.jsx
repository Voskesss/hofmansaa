import React from 'react';
import { Box, Typography, Container, Grid, Card, CardHeader, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessIcon from '@mui/icons-material/Business';
import { getAssetPath } from '../../utils/assetUtils';

// Gebruik de asset utility functie voor de afbeeldingspaden
const automotiveImg = getAssetPath('/assets/voertuigtechniek.jpg');
const trainingImg = getAssetPath('/assets/nedrlands-en-wiskunde-toetsing.jpg');
const nederlandsRekenenImg = getAssetPath('/assets/nedrlands-en-wiskunde-toetsing (1).jpg');
const nietTechnischImg = getAssetPath('/assets/opleidingen-niet-technisch-personeel.jpg');

// Animatie varianten voor framer-motion
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + (i * 0.1),
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const TrainingCards = () => {
  return (
    <Container maxWidth="lg" sx={{ padding: '60px 0' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            marginBottom: 6, 
            fontWeight: 'bold', 
            color: 'primary.main',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-15px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #1a4b8c, #ff6b35)',
              borderRadius: '2px'
            }
          }}
        >
          Onze Trainingen
        </Typography>
      </motion.div>

      <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
        {/* Trainingen voertuigtechniek werkplaats */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              '&:hover': { 
                transform: 'translateY(-8px)', 
                boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                '& .MuiCardHeader-root .MuiSvgIcon-root': {
                  transform: 'scale(1.1) rotate(5deg)'
                }
              } 
            }}>
              <CardHeader
                avatar={
                  <Box sx={{ 
                    bgcolor: 'rgba(26, 75, 140, 0.1)', 
                    borderRadius: '12px', 
                    p: 1.5, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                  }}>
                    <CarRepairIcon sx={{ 
                      color: 'primary.main', 
                      fontSize: 40,
                      transition: 'transform 0.3s ease'
                    }} />
                  </Box>
                }
                title={
                  <Typography variant="h5" sx={{ 
                    fontWeight: 'bold', 
                    color: 'primary.main',
                    fontSize: '1.25rem',
                    lineHeight: 1.3
                  }}>
                    Voertuigtechniek Werkplaats
                  </Typography>
                }
                sx={{ paddingBottom: 0 }}
              />
              <Box 
                component="img" 
                src={automotiveImg} 
                alt="Voertuigtechniek" 
                sx={{ 
                  width: '100%', 
                  height: '180px', 
                  objectFit: 'cover', 
                  borderRadius: '0px', 
                  my: 2,
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }} 
              />
              <CardContent sx={{ flexGrow: 1, p: 3, height: '150px', display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Onze geavanceerde trainingen richten zich op de nieuwste technieken in voertuigonderhoud en -reparatie. Ideaal voor monteurs die hun expertise willen verdiepen.
                </Typography>
              </CardContent>
              <Box sx={{ p: 3, pt: 0 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  component={Link} 
                  to="/voertuigtechniek" 
                  fullWidth 
                  sx={{ 
                    py: 1.2,
                    borderRadius: '8px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(26, 75, 140, 0.25)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(26, 75, 140, 0.4)',
                    }
                  }}
                >
                  Meer Informatie
                </Button>
              </Box>
            </Card>
          </motion.div>
        </Grid>

        {/* LLO */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              '&:hover': { 
                transform: 'translateY(-8px)', 
                boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                '& .MuiCardHeader-root .MuiSvgIcon-root': {
                  transform: 'scale(1.1) rotate(5deg)'
                }
              } 
            }}>
              <CardHeader
                avatar={
                  <Box sx={{ 
                    bgcolor: 'rgba(26, 75, 140, 0.1)', 
                    borderRadius: '12px', 
                    p: 1.5, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                  }}>
                    <SchoolIcon sx={{ 
                      color: 'primary.main', 
                      fontSize: 40,
                      transition: 'transform 0.3s ease'
                    }} />
                  </Box>
                }
                title={
                  <Typography variant="h5" sx={{ 
                    fontWeight: 'bold', 
                    color: 'primary.main',
                    fontSize: '1.25rem',
                    lineHeight: 1.3
                  }}>
                    LLO & APK Keuzedeel
                  </Typography>
                }
                sx={{ paddingBottom: 0 }}
              />
              <Box 
                component="img" 
                src={trainingImg} 
                alt="LLO & APK Keuzedeel" 
                sx={{ 
                  width: '100%', 
                  height: '180px', 
                  objectFit: 'cover', 
                  borderRadius: '0px', 
                  my: 2,
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }} 
              />
              <CardContent sx={{ flexGrow: 1, p: 3, height: '150px', display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Blijf leren met onze Leven Lang Ontwikkelen programma's en specialiseer je met het APK keuzedeel. Perfect voor professionals die up-to-date willen blijven.
                </Typography>
              </CardContent>
              <Box sx={{ p: 3, pt: 0 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  component={Link} 
                  to="/llo" 
                  fullWidth 
                  sx={{ 
                    py: 1.2,
                    borderRadius: '8px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(26, 75, 140, 0.25)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(26, 75, 140, 0.4)',
                    }
                  }}
                >
                  Meer Informatie
                </Button>
              </Box>
            </Card>
          </motion.div>
        </Grid>

        {/* Trainingen niet technisch personeel */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              '&:hover': { 
                transform: 'translateY(-8px)', 
                boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                '& .MuiCardHeader-root .MuiSvgIcon-root': {
                  transform: 'scale(1.1) rotate(5deg)'
                }
              } 
            }}>
              <CardHeader
                avatar={
                  <Box sx={{ 
                    bgcolor: 'rgba(26, 75, 140, 0.1)', 
                    borderRadius: '12px', 
                    p: 1.5, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                  }}>
                    <BusinessIcon sx={{ 
                      color: 'primary.main', 
                      fontSize: 40,
                      transition: 'transform 0.3s ease'
                    }} />
                  </Box>
                }
                title={
                  <Typography variant="h5" sx={{ 
                    fontWeight: 'bold', 
                    color: 'primary.main',
                    fontSize: '1.25rem',
                    lineHeight: 1.3
                  }}>
                    Niet-Technisch Personeel
                  </Typography>
                }
                sx={{ paddingBottom: 0 }}
              />
              <Box 
                component="img" 
                src={nietTechnischImg} 
                alt="Niet-Technisch Personeel" 
                sx={{ 
                  width: '100%', 
                  height: '180px', 
                  objectFit: 'cover', 
                  borderRadius: '0px', 
                  my: 2,
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }} 
              />
              <CardContent sx={{ flexGrow: 1, p: 3, height: '150px', display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Specialistische trainingen voor service adviseurs, receptionisten en andere niet-technische functies binnen de automotive sector.
                </Typography>
              </CardContent>
              <Box sx={{ p: 3, pt: 0 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  component={Link} 
                  to="/niet-technisch" 
                  fullWidth 
                  sx={{ 
                    py: 1.2,
                    borderRadius: '8px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(26, 75, 140, 0.25)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(26, 75, 140, 0.4)',
                    }
                  }}
                >
                  Meer Informatie
                </Button>
              </Box>
            </Card>
          </motion.div>
        </Grid>

        {/* Nederlands & Rekenen */}
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              '&:hover': { 
                transform: 'translateY(-8px)', 
                boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                '& .MuiCardHeader-root .MuiSvgIcon-root': {
                  transform: 'scale(1.1) rotate(5deg)'
                }
              } 
            }}>
              <CardHeader
                avatar={
                  <Box sx={{ 
                    bgcolor: 'rgba(26, 75, 140, 0.1)', 
                    borderRadius: '12px', 
                    p: 1.5, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                  }}>
                    <AssignmentIcon sx={{ 
                      color: 'primary.main', 
                      fontSize: 40,
                      transition: 'transform 0.3s ease'
                    }} />
                  </Box>
                }
                title={
                  <Typography variant="h5" sx={{ 
                    fontWeight: 'bold', 
                    color: 'primary.main',
                    fontSize: '1.25rem',
                    lineHeight: 1.3
                  }}>
                    Nederlands & Rekenen
                  </Typography>
                }
                sx={{ paddingBottom: 0 }}
              />
              <Box 
                component="img" 
                src={nederlandsRekenenImg} 
                alt="Nederlands & Rekenen" 
                sx={{ 
                  width: '100%', 
                  height: '180px', 
                  objectFit: 'cover', 
                  borderRadius: '0px', 
                  my: 2,
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }} 
              />
              <CardContent sx={{ flexGrow: 1, p: 3, height: '150px', display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Essentiële basisvaardigheden voor EVC-trajecten. Met onze trainingen en toetsingen behaal je het niveau dat nodig is voor de volgende stap in je carrière.
                </Typography>
              </CardContent>
              <Box sx={{ p: 3, pt: 0 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  component={Link} 
                  to="/nederlands-rekenen" 
                  fullWidth 
                  sx={{ 
                    py: 1.2,
                    borderRadius: '8px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(26, 75, 140, 0.25)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(26, 75, 140, 0.4)',
                    }
                  }}
                >
                  Meer Informatie
                </Button>
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TrainingCards;
