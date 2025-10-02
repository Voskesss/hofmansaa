import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  useTheme, 
  Alert,
  Link
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import BackgroundIcons from '../components/decorative/BackgroundIcons';

const StudentPortal = () => {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>Studenten Portal | Hofmans Automotive Academie</title>
        <meta name="description" content="Log in op het studenten portal van Hofmans Automotive Academie voor toegang tot je leermateriaal en voortgang." />
      </Helmet>
      
      {/* Header met schuine bovenkant */}
      <Box sx={{ 
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`, 
        color: theme.palette.common.white, 
        padding: '100px 0 80px', 
        textAlign: 'center', 
        position: 'relative', 
        overflow: 'hidden',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', // Aangepast naar rechthoekige vorm
        marginTop: '-1px' // Voorkomt kleine witte lijn tussen navbar en header
      }}>
        {/* Decoratieve cirkels */}
        <Box sx={{ 
          position: 'absolute', 
          top: '-15%', 
          right: '-5%', 
          width: '300px', 
          height: '300px', 
          borderRadius: '50%', 
          background: `radial-gradient(circle, ${theme.palette.secondary.main}80 0%, ${theme.palette.secondary.main}00 70%)`, 
          zIndex: 0 
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: '-10%', 
          left: '5%', 
          width: '250px', 
          height: '250px', 
          borderRadius: '50%', 
          background: `radial-gradient(circle, ${theme.palette.tertiary.main}60 0%, ${theme.palette.tertiary.main}00 70%)`, 
          zIndex: 0 
        }} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold', 
                marginBottom: 3, 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '4px',
                  background: theme.palette.secondary.main,
                  borderRadius: '2px'
                }
              }}
            >
              Studenten Portal
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography variant="h5" sx={{ 
              maxWidth: '800px', 
              margin: '0 auto', 
              lineHeight: 1.6,
              mt: 4,
              textShadow: '0 1px 5px rgba(0,0,0,0.2)'
            }}>
              Log in om toegang te krijgen tot je leermateriaal en voortgang
            </Typography>
          </motion.div>
        </Container>
      </Box>
      
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          py: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.tertiary.main}20, ${theme.palette.secondary.main}15)`,
          color: theme.palette.text.primary,
          marginTop: '-1px',
          overflow: 'hidden'
        }}
      >
        {/* Decoratieve icoontjes op de achtergrond */}
        <BackgroundIcons opacity={0.08} count={4} zIndex={0} />
        <Container maxWidth="xl">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {/* Info alert boven de iframe */}
            <Alert 
              severity="info" 
              icon={<InfoIcon />}
              sx={{ 
                mb: 3,
                maxWidth: '1200px',
                mx: 'auto',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <Typography variant="body2">
                Je wordt nu doorgestuurd naar het EXTRAAS leerplatform. Log in met je persoonlijke inloggegevens. 
                Heb je nog geen account? Neem contact op met je docent of onze administratie.
              </Typography>
            </Alert>

            {/* iframe container */}
            <Paper 
              elevation={6} 
              sx={{ 
                borderRadius: 3,
                overflow: 'hidden',
                maxWidth: '1200px',
                mx: 'auto',
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.2)`,
                background: 'white',
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  p: 2,
                  gap: 1.5,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  color: 'white'
                }}
              >
                <SchoolIcon sx={{ fontSize: 32 }} />
                <Typography variant="h6" fontWeight={600}>
                  EXTRAAS Studenten Portal
                </Typography>
              </Box>
              
              {/* iframe voor extraas.nl */}
              <Box
                component="iframe"
                src="https://extraas.nl/inloggen"
                title="EXTRAAS Studenten Portal"
                sx={{
                  width: '100%',
                  height: { xs: '600px', md: '700px' },
                  border: 'none',
                  display: 'block'
                }}
              />
            </Paper>

            {/* Hulp sectie onder de iframe */}
            <Box 
              sx={{ 
                mt: 4, 
                textAlign: 'center',
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Let op:</strong> Het kan zijn dat je na het inloggen wordt doorgestuurd naar een nieuwe pagina. 
                Dit is normaal en betekent dat de login succesvol was.
              </Typography>
              <Link 
                href="https://extraas.nl/lostpassword" 
                target="_blank" 
                rel="noopener noreferrer"
                underline="hover"
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}
              >
                Wachtwoord vergeten? Klik hier
              </Link>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default StudentPortal;
