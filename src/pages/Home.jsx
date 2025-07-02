import React from 'react';
import { Box, Typography, Container, Button, Chip, Divider, useTheme, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import TrainingCards from '../components/home/TrainingCards';
import { SEO } from '../utils/seo.jsx';
import { motion } from 'framer-motion';
import { getAssetPath } from '../utils/assetUtils';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import SchoolIcon from '@mui/icons-material/School';
import SpeedIcon from '@mui/icons-material/Speed';

// Gebruik de asset utility functie voor het logo pad
const logo = getAssetPath('/assets/logo-hofmans.png');

// Animatie varianten voor framer-motion
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const heroImageVariants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

function Home() {
  const theme = useTheme();
  
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
      <Box 
        sx={{ 
          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`, 
          color: theme.palette.common.white, 
          padding: { xs: '80px 0', md: '120px 0' }, 
          textAlign: 'center', 
          position: 'relative', 
          overflow: 'hidden',
          borderBottom: `5px solid ${theme.palette.secondary.main}`
        }}
      >
        {/* Animated background pattern */}
        <Box sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.4,
          zIndex: 0
        }} />
        
        {/* Hero background image */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/assets/Hofmans-automotive-academie-home.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            zIndex: 0
          }}
          variants={heroImageVariants}
          animate="animate"
        />
        
        {/* Decorative elements */}
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: `linear-gradient(135deg, ${theme.palette.primary.main}33, ${theme.palette.tertiary.main}40, ${theme.palette.secondary.main}33)`,
          zIndex: 0
        }} />
        
        {/* Animated car and tools */}
        <Box sx={{ 
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 0
        }}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.15 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '5%',
            }}
          >
            <DirectionsCarIcon sx={{ fontSize: { xs: 60, md: 100 }, color: theme.palette.primary.main }} />
          </motion.div>
          
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 0.15 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '25%',
              right: '15%',
            }}
          >
            <BuildIcon sx={{ fontSize: { xs: 50, md: 80 }, color: theme.palette.secondary.main }} />
          </motion.div>
          
          <motion.div
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 0.15 }}
            transition={{ duration: 1, delay: 1.2 }}
            style={{
              position: 'absolute',
              top: '20%',
              right: '10%',
            }}
          >
            <SchoolIcon sx={{ fontSize: { xs: 40, md: 70 }, color: theme.palette.tertiary.main }} />
          </motion.div>
          
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 1.3, delay: 1 }}
            style={{
              position: 'absolute',
              top: '30%',
              left: '15%',
            }}
          >
            <SpeedIcon sx={{ fontSize: { xs: 45, md: 75 }, color: theme.palette.primary.dark }} />
          </motion.div>
        </Box>
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginBottom: 4,
                position: 'relative'
              }}
            >
              <motion.img 
                src={logo} 
                alt="Hofmans Automotive Logo" 
                style={{ 
                  height: '140px', 
                  maxWidth: '100%',
                  filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.2))'
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </Box>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 800, 
                marginBottom: 3, 
                fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem' },
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                background: `linear-gradient(90deg, ${theme.palette.common.white}, ${theme.palette.background.default})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em'
              }}
            >
              Hofmans Automotive Academie
            </Typography>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                maxWidth: '800px', 
                margin: '0 auto', 
                lineHeight: 1.7, 
                marginBottom: 5,
                fontWeight: 400,
                fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
                opacity: 0.9
              }}
            >
              Hoogwaardige trainingen en onderwijs voor de automotive sector. 
              <Box component="span" sx={{ color: theme.palette.secondary.main, fontWeight: 600 }}>Van voertuigtechniek tot LLO-programma's</Box>, 
              wij helpen u vooruit met professionele kennis en vaardigheden.
            </Typography>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: `${theme.palette.primary.main}15`,
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${theme.palette.primary.main}30`,
                  }}>
                    <DirectionsCarIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
                    <Typography variant="body1" fontWeight={600} textAlign="center">Voertuigtechniek</Typography>
                  </Box>
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: `${theme.palette.secondary.main}15`,
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${theme.palette.secondary.main}30`,
                  }}>
                    <BuildIcon sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 1 }} />
                    <Typography variant="body1" fontWeight={600} textAlign="center">Praktijkgericht</Typography>
                  </Box>
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: `${theme.palette.tertiary.main}15`,
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${theme.palette.tertiary.main}30`,
                  }}>
                    <SchoolIcon sx={{ fontSize: 40, color: theme.palette.tertiary.main, mb: 1 }} />
                    <Typography variant="body1" fontWeight={600} textAlign="center">Professioneel</Typography>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Button 
                variant="contained" 
                color="secondary" 
                size="large" 
                component={Link}
                to="/contact" 
                sx={{ 
                  padding: '16px 42px', 
                  fontSize: '1.1rem',
                  borderRadius: '50px',
                  bgcolor: theme.palette.secondary.main,
                  boxShadow: `0 10px 25px ${theme.palette.secondary.main}66`,
                  '&:hover': {
                    bgcolor: theme.palette.secondary.dark
                  }
                }}
              >
                Meld Je Aan
              </Button>
            </motion.div>
          </motion.div>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Chip 
                icon={<EmojiObjectsIcon />} 
                label="Ontdek onze trainingen" 
                sx={{ 
                  bgcolor: `${theme.palette.common.white}26`, 
                  color: theme.palette.common.white,
                  backdropFilter: 'blur(10px)',
                  '& .MuiChip-icon': { color: theme.palette.secondary.main }
                }}
              />
            </motion.div>
          </Box>
        </Container>
      </Box>
      
      {/* Over onze trainingen sectie */}
      <Box sx={{ 
        py: 8, 
        background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.tertiary.main}10, ${theme.palette.secondary.main}08)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decoratieve elementen */}
        <Box sx={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.primary.main}01)`,
          zIndex: 0
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '5%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          background: `linear-gradient(135deg, ${theme.palette.secondary.main}08, ${theme.palette.secondary.main}01)`,
          zIndex: 0
        }} />
        
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              align="center"
              sx={{ 
                fontWeight: 700, 
                mb: 3,
                color: theme.palette.primary.main,
                position: 'relative',
                display: 'inline-block',
                width: '100%',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '4px',
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  borderRadius: '2px'
                }
              }}
            >
              Trainingen binnen de automotive sector
            </Typography>
          </motion.div>
          
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box sx={{ 
                  p: 3, 
                  borderRadius: 4, 
                  boxShadow: `0 8px 32px ${theme.palette.primary.main}15`,
                  height: '100%',
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.primary.main}20`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '5px',
                    height: '100%',
                    background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.tertiary.main})`,
                  }
                }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: theme.palette.primary.main }}>
                    Breed scala aan trainingen
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                    Bij HAMA bieden we een breed scala aan trainingen voor zowel technisch personeel in de automotive sector als voor ondersteunend personeel zoals receptionisten en administratief medewerkers. Of het nu gaat om specialistische voertuigtechniek of communicatieve vaardigheden, wij helpen u de juiste kennis en vaardigheden op te doen.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Box sx={{ 
                  p: 3, 
                  borderRadius: 4, 
                  boxShadow: `0 8px 32px ${theme.palette.secondary.main}15`,
                  height: '100%',
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.secondary.main}20`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '5px',
                    height: '100%',
                    background: `linear-gradient(to bottom, ${theme.palette.secondary.main}, ${theme.palette.tertiary.main})`,
                  }
                }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: theme.palette.secondary.main }}>
                    LLO en Nederlands & Rekenen
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                    Daarnaast bieden we trainingen LLO aan voor het onderwijs waaronder het keuzedeel APK. En worden de training en toetsing Nederlands en rekenen verzorgd. Dit zijn essentiële basisvaardigheden voor het succesvol doorlopen van een EVC-traject (Erkenning van Verworven Competenties). Via HAMA kunt u oefenen en uw vaardigheden verbeteren met ons uitgebreide oefenmateriaal.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ textAlign: 'center', marginTop: '40px' }}
          >
            <Typography variant="h5" sx={{ 
              fontWeight: 600, 
              color: theme.palette.text.primary,
              p: 2,
              borderRadius: 2,
              display: 'inline-block',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
              boxShadow: `0 4px 20px ${theme.palette.primary.main}20`,
            }}>
              Kies voor HAMA en investeer in uw toekomst!
            </Typography>
          </motion.div>
        </Container>
      </Box>
      
      {/* Trainingen Section */}
      <TrainingCards />
    </Box>
  );
}

export default Home;
