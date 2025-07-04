import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, TextField, Button, Grid, Card, CardContent, Select, MenuItem, InputLabel, FormControl, Dialog, DialogContent, DialogActions, useTheme, alpha } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import { SEO } from '../utils/seo.jsx';
import emailjs from '@emailjs/browser';

function Contact() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    training: [],
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // EmailJS configuratie - veilig opgeslagen in environment variables
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_jyo37pp';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_37a1ftj';
  const EMAILJS_AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || 'template_06x3cuo';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'rBcqZk3mmSP0xkpQh';

  // 🐛 DEBUG: Log configuratie om te zien wat er gebruikt wordt
  console.log('🔧 EmailJS Debug Info:', {
    environment: import.meta.env.MODE,
    serviceId: EMAILJS_SERVICE_ID,
    templateId: EMAILJS_TEMPLATE_ID,
    autoReplyTemplateId: EMAILJS_AUTOREPLY_TEMPLATE_ID,
    publicKey: EMAILJS_PUBLIC_KEY?.substring(0, 8) + '...', // Alleen eerste 8 chars voor veiligheid
    envVarsLoaded: {
      service: !!import.meta.env.VITE_EMAILJS_SERVICE_ID,
      template: !!import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      autoReply: !!import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
      publicKey: !!import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    },
    // Toon de volledige environment voor debugging
    allEnvVars: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'))
  });
  
  // Log een speciale debug message voor GitHub Pages
  console.log('🔍 GITHUB DEBUG - Environment Variables:', {
    service: EMAILJS_SERVICE_ID,
    template: EMAILJS_TEMPLATE_ID,
    autoreply: EMAILJS_AUTOREPLY_TEMPLATE_ID,
    publicKey: EMAILJS_PUBLIC_KEY,
    env_service: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    env_template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    env_mode: import.meta.env.MODE,
    env_base: import.meta.env.BASE_URL
  });

  // Initialiseer EmailJS met public key (eenmalig)
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Controleer bij het laden van de component of er een geselecteerde training is
  useEffect(() => {
    const selectedTraining = localStorage.getItem('selectedTraining');
    if (selectedTraining) {
      // Voeg de geselecteerde training toe aan het formulier
      setFormData(prevState => ({
        ...prevState,
        training: [...prevState.training, selectedTraining]
      }));
      // Verwijder de selectie uit localStorage na gebruik
      localStorage.removeItem('selectedTraining');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'training') {
      // Voor de training select met multiple optie
      setFormData(prevState => ({ ...prevState, [name]: value }));
    } else {
      // Voor alle andere velden
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // DEBUG: Log alle environment variables
    console.log('🔍 GITHUB DEBUG - Environment Variables:', {
      service: EMAILJS_SERVICE_ID,
      template: EMAILJS_TEMPLATE_ID,
      autoreply: EMAILJS_AUTOREPLY_TEMPLATE_ID,
      publicKey: EMAILJS_PUBLIC_KEY,
      env_service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      env_template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      env_public: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      all_env: import.meta.env
    });

    // Controleer of alle vereiste waarden aanwezig zijn
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('❌ Missing EmailJS configuration:', {
        service: !!EMAILJS_SERVICE_ID,
        template: !!EMAILJS_TEMPLATE_ID,
        publicKey: !!EMAILJS_PUBLIC_KEY
      });
      
      setNotification({
        open: true,
        message: '⚠️ Er is een configuratiefout. Probeer het later opnieuw of neem direct contact met ons op.',
        severity: 'error'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Maak een leesbare weergave van de geselecteerde trainingen 
      const selectedOptions = {
        'voertuigtechniek': 'Voertuigtechniek Werkplaats',
        'llo': 'Leven Lang Ontwikkelen (LLO)',
        'niet-technisch': 'Niet-Technisch Personeel',
        'nederlands-rekenen': 'Nederlands & Rekenen'
      };
      
      const selectedTrainings = formData.training.length > 0 
        ? formData.training.map(item => selectedOptions[item]).join(', ')
        : 'Geen specifieke training geselecteerd';

      // EmailJS template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        selected_trainings: selectedTrainings,
        message: formData.message,
        to_email: 'info@hofmansautomotiveacademie.nl' // Vervang met je eigen email
      };

      // Verstuur email via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // Verstuur auto-reply email via EmailJS
      const autoReplyTemplateParams = {
        to_name: formData.name,
        to_email: formData.email,
        phone: formData.phone,
        selected_trainings: selectedTrainings,
        message: formData.message
      };
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTOREPLY_TEMPLATE_ID,
        autoReplyTemplateParams,
        EMAILJS_PUBLIC_KEY
      );

      // Toon succesbericht
      setNotification({
        open: true,
        message: `🎉 Fantastisch ${formData.name}! 

Wat leuk dat je ons een bericht hebt gestuurd! We hebben je aanmelding voor "${selectedTrainings}" ontvangen.

We nemen zo spoedig mogelijk contact met je op voor verdere informatie. Tot snel! 🚀`,
        severity: 'success'
      });

      // Reset het formulier
      setFormData({ name: '', email: '', phone: '', training: [], message: '' });

    } catch (error) {
      console.error('❌ EmailJS Error Details:', {
        error: error,
        status: error.status,
        text: error.text,
        message: error.message,
        usedConfig: {
          serviceId: EMAILJS_SERVICE_ID,
          templateId: EMAILJS_TEMPLATE_ID,
          publicKey: EMAILJS_PUBLIC_KEY?.substring(0, 8) + '...'
        }
      });
      
      setNotification({
        open: true,
        message: `Er is een fout opgetreden bij het verzenden van je bericht. 

🐛 Debug info: ${error.status} - ${error.text || error.message}

Probeer het opnieuw of neem direct contact met ons op.`,
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box>
      <SEO 
        title="Contact & Aanmelden | Hofmans Automotive Academie"
        description="Meld je aan voor een training of neem contact op met Hofmans Automotive Academie voor meer informatie over onze automotive opleidingen."
        keywords="contact Hofmans, aanmelden training, automotive opleiding, Hofmans Automotive Academie"
        image="/assets/logo-hofmans.png"
        url="https://hofmansautomotiveacademie.github.io/contact"
      />
      {/* Header met decoratieve elementen */}
      <Box sx={{ 
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`, 
        color: theme.palette.common.white, 
        padding: '100px 0 80px', 
        textAlign: 'center', 
        position: 'relative', 
        overflow: 'hidden',
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
      }}>
        {/* Decoratieve cirkels */}
        <Box sx={{ 
          position: 'absolute', 
          top: '-15%', 
          right: '-5%', 
          width: '300px', 
          height: '300px', 
          borderRadius: '50%', 
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.8)} 0%, ${alpha(theme.palette.secondary.main, 0)} 70%)`, 
          zIndex: 0 
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: '-10%', 
          left: '5%', 
          width: '250px', 
          height: '250px', 
          borderRadius: '50%', 
          background: `radial-gradient(circle, ${alpha('#008494', 0.6)} 0%, ${alpha('#008494', 0)} 70%)`, 
          zIndex: 0 
        }} />
        
        {/* Achtergrondafbeelding met overlay */}
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'url(https://hofmansautomotiveacademie.nl/wp-content/uploads/2023/11/Hofmans-Automotive-Academy-1024x683.jpg) no-repeat center center/cover', 
          opacity: 0.15, 
          zIndex: 0,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${theme.palette.primary.dark}99 0%, ${theme.palette.primary.main}80 100%)`,
          }
        }} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" sx={{ 
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
            }}>
              Neem Contact Op & Meld Je Aan
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
              Ben je klaar voor de volgende stap in je carrière? Vul het formulier in en wij nemen zo snel mogelijk contact met je op.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ padding: '80px 0' }}>
        {/* Decoratieve lijnen */}
        <Box sx={{ 
          position: 'absolute', 
          left: 0, 
          right: 0,
          height: '100%',
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '5%',
            left: '-5%',
            width: '10%',
            height: '180px',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}40 0%, ${theme.palette.primary.main}00 100%)`,
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            transform: 'rotate(-15deg)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '15%',
            right: '-2%',
            width: '15%',
            height: '250px',
            background: `linear-gradient(135deg, ${theme.palette.secondary.main}30 0%, ${theme.palette.secondary.main}00 100%)`,
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            transform: 'rotate(25deg)',
          }
        }} />
        
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card sx={{ 
                borderRadius: 4, 
                height: '100%', 
                transition: 'transform 0.3s, box-shadow 0.3s', 
                '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '5px',
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, #008494)`,
                }
              }}>
                <CardContent sx={{ padding: 5 }}>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 'bold', 
                    marginBottom: 3, 
                    color: 'primary.main',
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-8px',
                      left: '0',
                      width: '60px',
                      height: '3px',
                      background: theme.palette.secondary.main,
                      borderRadius: '2px'
                    }
                  }}>
                    Aanmeldformulier
                  </Typography>
                <form onSubmit={handleSubmit}>
                  <Box sx={{ mb: 3 }}>
                    <TextField 
                      fullWidth 
                      label="Naam" 
                      variant="outlined" 
                      margin="normal" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: theme.palette.primary.main,
                        },
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        }
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <TextField 
                      fullWidth 
                      label="Email" 
                      variant="outlined" 
                      margin="normal" 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: theme.palette.primary.main,
                        },
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        }
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <TextField 
                      fullWidth 
                      label="Telefoonnummer" 
                      variant="outlined" 
                      margin="normal" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: theme.palette.primary.main,
                        },
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        }
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <FormControl 
                      fullWidth 
                      margin="normal" 
                      variant="outlined"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.secondary.main,
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.secondary.main,
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: theme.palette.secondary.main,
                        },
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      <InputLabel id="training-select-label">Interesse in Training</InputLabel>
                      <Select
                        labelId="training-select-label"
                        id="training-select"
                        name="training"
                        value={formData.training}
                        onChange={handleChange}
                        label="Interesse in Training"
                        multiple
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>Selecteer trainingen</em>;
                          }
                          
                          const selectedOptions = {
                            'voertuigtechniek': 'Voertuigtechniek Werkplaats',
                            'llo': 'Leven Lang Ontwikkelen (LLO)',
                            'niet-technisch': 'Niet-Technisch Personeel',
                            'nederlands-rekenen': 'Nederlands & Rekenen'
                          };
                          
                          return selected.map(item => selectedOptions[item]).join(', ');
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 300
                            }
                          }
                        }}
                      >
                        <MenuItem value="voertuigtechniek">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <input 
                              type="checkbox" 
                              checked={formData.training.indexOf('voertuigtechniek') > -1} 
                              readOnly 
                              style={{ marginRight: '8px' }} 
                            />
                            Voertuigtechniek Werkplaats
                          </Box>
                        </MenuItem>
                        <MenuItem value="llo">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <input 
                              type="checkbox" 
                              checked={formData.training.indexOf('llo') > -1} 
                              readOnly 
                              style={{ marginRight: '8px' }} 
                            />
                            Leven Lang Ontwikkelen (LLO)
                          </Box>
                        </MenuItem>
                        <MenuItem value="niet-technisch">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <input 
                              type="checkbox" 
                              checked={formData.training.indexOf('niet-technisch') > -1} 
                              readOnly 
                              style={{ marginRight: '8px' }} 
                            />
                            Niet-Technisch Personeel
                          </Box>
                        </MenuItem>
                        <MenuItem value="nederlands-rekenen">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <input 
                              type="checkbox" 
                              checked={formData.training.indexOf('nederlands-rekenen') > -1} 
                              readOnly 
                              style={{ marginRight: '8px' }} 
                            />
                            Nederlands & Rekenen
                          </Box>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  
                  <Box sx={{ mb: 4 }}>
                    <TextField 
                      fullWidth 
                      label="Bericht" 
                      variant="outlined" 
                      margin="normal" 
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#008494',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#008494',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#008494',
                        },
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        }
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    mt: 4
                  }}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      size="large" 
                      endIcon={<SendIcon />}
                      disabled={isSubmitting}
                      sx={{ 
                        py: 1.5, 
                        px: 4, 
                        borderRadius: '8px',
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        bgcolor: theme.palette.primary.main,
                        boxShadow: `0 4px 14px ${theme.palette.primary.main}40`,
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          bgcolor: theme.palette.primary.dark,
                          boxShadow: `0 6px 20px ${theme.palette.primary.main}66`,
                          transform: 'translateY(-3px)'
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: `linear-gradient(90deg, transparent, ${alpha('#ffffff', 0.2)}, transparent)`,
                          animation: isSubmitting ? 'none' : 'shine 1.5s infinite',
                        },
                        '@keyframes shine': {
                          '0%': { left: '-100%' },
                          '100%': { left: '100%' }
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {isSubmitting ? 'Verzenden...' : 'Verstuur Aanmelding'}
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card sx={{ 
                borderRadius: 4, 
                height: '100%', 
                transition: 'transform 0.3s, box-shadow 0.3s', 
                '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '5px',
                  background: `linear-gradient(90deg, #008494, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                }
              }}>
                <CardContent sx={{ padding: 5 }}>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 'bold', 
                    marginBottom: 3, 
                    color: 'primary.main',
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-8px',
                      left: '0',
                      width: '60px',
                      height: '3px',
                      background: '#008494',
                      borderRadius: '2px'
                    }
                  }}>
                    Contactgegevens
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    marginBottom: 3,
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateX(5px)' }
                  }}>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      marginRight: 2
                    }}>
                      <LocationOnIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Adres</Typography>
                      <Typography variant="body1">Boskantse Broekstraat 3, 6603 LD Wijchen</Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    marginBottom: 3,
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateX(5px)' }
                  }}>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                      marginRight: 2
                    }}>
                      <EmailIcon sx={{ fontSize: 28, color: theme.palette.secondary.main }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.secondary.main }}>E-mail</Typography>
                      <Typography variant="body1">Aanmeldingen & Vragen: <a href="mailto:support@hofmansautomotiveacademie.nl" style={{ color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 500 }}>support@hofmansautomotiveacademie.nl</a></Typography>
                      <Typography variant="body1">Ondersteuning: <a href="mailto:h.lombarts@hofmansautomotiveacademie.nl" style={{ color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 500 }}>h.lombarts@hofmansautomotiveacademie.nl</a></Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    marginBottom: 3,
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateX(5px)' }
                  }}>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: alpha('#008494', 0.1),
                      marginRight: 2
                    }}>
                      <PhoneIcon sx={{ fontSize: 28, color: '#008494' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#008494' }}>Telefoon</Typography>
                      <Typography variant="body1">+31 (0)24 641 32 22</Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ 
                    marginTop: 5, 
                    padding: 2, 
                    borderRadius: 2, 
                    backgroundColor: alpha(theme.palette.grey[100], 0.5),
                    border: `1px solid ${theme.palette.grey[200]}`
                  }}>
                    <Typography variant="body2" sx={{ marginTop: 1, color: theme.palette.text.secondary }}>
                      <strong>KVK-nummer:</strong> 97469785
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      © 2024 Hofmans Automotive Academie. Alle rechten voorbehouden.
                    </Typography>
                  </Box>
              </CardContent>
            </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      <Dialog
        open={notification.open}
        onClose={handleCloseNotification}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`,
            color: 'white',
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: alpha(theme.palette.secondary.main, 0.3),
              zIndex: 0
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-30%',
              left: '-10%',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: alpha('#008494', 0.2),
              zIndex: 0
            }
          }
        }}
      >
        <DialogContent sx={{ padding: 6, textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: '#4ade80', marginBottom: 3, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} />
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold', 
            marginBottom: 3,
            fontSize: { xs: '1.5rem', md: '2rem' },
            lineHeight: 1.4,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            {notification.message}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: 4, justifyContent: 'center' }}>
          <Button 
            onClick={handleCloseNotification} 
            variant="contained" 
            size="large"
            sx={{
              backgroundColor: 'white',
              color: '#667eea',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              padding: '12px 32px',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#f8fafc',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Geweldig! 🎉
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Contact;
