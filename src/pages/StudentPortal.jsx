import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  useTheme, 
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Link
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';

const StudentPortal = () => {
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Vul alstublieft alle velden in');
      return;
    }
    
    // Redirect naar extraas.nl met de inloggegevens
    // We gebruiken hier een POST form submit om de gegevens veilig door te sturen
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://extraas.nl/inloggen';
    form.target = '_blank'; // Open in een nieuw tabblad
    
    // Gebruikersnaam veld
    const usernameInput = document.createElement('input');
    usernameInput.type = 'hidden';
    usernameInput.name = 'username'; // Dit moet overeenkomen met het veldnaam op extraas.nl
    usernameInput.value = username;
    form.appendChild(usernameInput);
    
    // Wachtwoord veld
    const passwordInput = document.createElement('input');
    passwordInput.type = 'hidden';
    passwordInput.name = 'password'; // Dit moet overeenkomen met het veldnaam op extraas.nl
    passwordInput.value = password;
    form.appendChild(passwordInput);
    
    // Voeg het formulier toe aan de pagina en verstuur het
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

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
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          py: 6,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.tertiary.main}20, ${theme.palette.secondary.main}15)`,
          color: theme.palette.text.primary,
          marginTop: '-1px', // Voorkomt kleine witte lijn tussen secties
        }}
      >
        <Container maxWidth="md">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <Box 
              sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4
              }}
            >
              <Paper 
                elevation={4} 
                sx={{ 
                  p: 4, 
                  borderRadius: 3,
                  width: { xs: '100%', md: '50%' },
                  background: 'white',
                  boxShadow: `0 8px 32px rgba(0, 0, 0, 0.2)`,
                  color: theme.palette.text.primary, // Zorgt dat tekst donker is op witte achtergrond
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    gap: 1.5
                  }}
                >
                  <SchoolIcon sx={{ fontSize: 36, color: theme.palette.primary.main }} />
                  <Typography variant="h5" component="h2" fontWeight={600}>
                    Inloggen bij EXTRAAS
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}
                
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Gebruikersnaam"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <TextField
                    label="Wachtwoord"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ 
                      mt: 3,
                      py: 1.5,
                      bgcolor: theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark
                      }
                    }}
                  >
                    Inloggen
                  </Button>
                </form>
                
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Link 
                    href="https://extraas.nl/lostpassword" 
                    target="_blank" 
                    underline="hover"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    Wachtwoord vergeten?
                  </Link>
                </Box>
              </Paper>
              
              <Box sx={{ width: { xs: '100%', md: '40%' } }}>
                <Typography variant="h6" gutterBottom fontWeight={600} color={theme.palette.primary.main}>
                  Welkom bij het Studenten Portal
                </Typography>
                <Typography paragraph>
                  Via dit portal krijg je toegang tot al je leermateriaal, oefeningen en toetsen van EXTRAAS. Log in met je persoonlijke gegevens om je voortgang te bekijken en verder te gaan met je studie.
                </Typography>
                <Typography paragraph>
                  Heb je nog geen account? Neem dan contact op met je docent of met onze administratie voor het verkrijgen van inloggegevens.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
                  Let op: Na het inloggen word je doorgestuurd naar het EXTRAAS leerplatform.
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default StudentPortal;
