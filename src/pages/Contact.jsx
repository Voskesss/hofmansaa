import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, TextField, Button, Grid, Card, CardContent, Dialog, DialogContent, DialogActions, useTheme, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { motion } from 'framer-motion';
import { SEO } from '../utils/seo.jsx';
import { initEmailJS, sendContactEmail } from '../utils/emailService';

function Contact() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    training: '',
    message: ''
  });

  const [trainingen, setTrainingen] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    initEmailJS();
    fetchTrainingen();
  }, []);

  const fetchTrainingen = async () => {
    try {
      const response = await fetch('/api/admin/trainingen?filter=contact');
      const data = await response.json();
      if (data.success) {
        setTrainingen(data.data);
      }
    } catch (err) {
      console.error('Fout bij ophalen trainingen:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendContactEmail(formData);

      setNotification({
        open: true,
        message: `🎉 Bedankt ${formData.name}!\n\nWe hebben je bericht ontvangen en nemen zo spoedig mogelijk contact met je op. Tot snel! 🚀`,
        severity: 'success'
      });

      setFormData({ 
        name: '',
        email: '',
        phone: '',
        message: ''
      });

    } catch (error) {
      console.error('EmailJS Error:', error);
      setNotification({
        open: true,
        message: `Er is een fout opgetreden bij het verzenden van je bericht.\n\nProbeer het opnieuw of neem direct contact met ons op.`,
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
        title="Contact | Hofmans Automotive Academie"
        description="Neem contact op met Hofmans Automotive Academie voor meer informatie over onze automotive opleidingen."
        keywords="contact Hofmans, automotive opleiding, Hofmans Automotive Academie"
        image="/assets/logo-hofmans.png"
        url="https://hofmansautomotiveacademie.github.io/contact"
      />
      
      <Box sx={{ 
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`, 
        color: theme.palette.common.white, 
        padding: '100px 0 80px', 
        textAlign: 'center', 
        position: 'relative', 
        overflow: 'hidden',
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
              Neem Contact Op
            </Typography>
            <Typography variant="h5" sx={{ maxWidth: '800px', margin: '0 auto', mt: 4 }}>
              Heb je een vraag of wil je meer informatie? Vul het formulier in en wij nemen zo snel mogelijk contact met je op.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ padding: '80px 0' }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent sx={{ padding: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3, color: 'primary.main' }}>
                  Contactformulier
                </Typography>
                
                <form onSubmit={handleSubmit} autoComplete="off">
                  <TextField 
                    fullWidth
                    label="Naam" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    sx={{ mb: 2 }}
                  />
                  
                  <TextField 
                    fullWidth 
                    label="Email" 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    sx={{ mb: 2 }}
                  />
                  
                  <TextField 
                    fullWidth 
                    label="Telefoonnummer (optioneel)" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="off"
                    sx={{ mb: 2 }}
                  />

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Over welke training wil je informatie? *</InputLabel>
                    <Select
                      name="training"
                      value={formData.training}
                      onChange={handleChange}
                      label="Over welke training wil je informatie? *"
                      required
                    >
                      {trainingen.map((training) => (
                        <MenuItem key={training.id} value={training.naam}>
                          {training.naam}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <TextField 
                    fullWidth 
                    label="Bericht" 
                    name="message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    sx={{ mb: 3 }}
                  />
                  
                  <Button 
                    type="submit" 
                    variant="contained" 
                    size="large" 
                    fullWidth
                    endIcon={<SendIcon />}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Verzenden...' : 'Verstuur Bericht'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent sx={{ padding: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3, color: 'primary.main' }}>
                  Contactgegevens
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 3 }}>
                  <LocationOnIcon sx={{ marginRight: 2, color: 'primary.main', mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Adres</Typography>
                    <Typography>Boskantse Broekstraat 3</Typography>
                    <Typography>6603 LD Wijchen</Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 3 }}>
                  <EmailIcon sx={{ marginRight: 2, color: 'secondary.main', mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>E-mail</Typography>
                    <Typography>
                      <a href="mailto:support@hofmansautomotiveacademie.nl" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
                        support@hofmansautomotiveacademie.nl
                      </a>
                    </Typography>
                    <Typography>
                      <a href="mailto:h.lombarts@hofmansautomotiveacademie.nl" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
                        h.lombarts@hofmansautomotiveacademie.nl
                      </a>
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 3 }}>
                  <PhoneIcon sx={{ marginRight: 2, color: '#008494', mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Telefoon</Typography>
                    <Typography>
                      <a href="tel:+31246413222" style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>
                        +31 (0)24 641 32 22
                      </a>
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ marginTop: 5, padding: 3, borderRadius: 2, backgroundColor: 'rgba(0,0,0,0.03)', border: `1px solid ${theme.palette.grey[200]}` }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>KVK-nummer:</strong> 97469785
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    © {new Date().getFullYear()} Hofmans Automotive Academie. Alle rechten voorbehouden.
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Button naar aanmeldpagina - onder contactgegevens */}
            <Card sx={{ borderRadius: 4, mt: 3 }}>
              <CardContent sx={{ padding: 5, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                  Wil je je aanmelden voor een training?
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', mb: 4, fontSize: '1.1rem' }}>
                  Klik hier om naar het aanmeldformulier te gaan en je in te schrijven voor een training.
                </Typography>
                <Button 
                  variant="contained" 
                  size="large"
                  fullWidth
                  onClick={() => navigate('/aanmelden')}
                  sx={{
                    background: 'linear-gradient(45deg, #ff6b35, #ff9468)',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    py: 2,
                    borderRadius: '50px',
                    textTransform: 'none',
                    boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #cc4a1a, #ff6b35)',
                      boxShadow: '0 6px 25px rgba(255, 107, 53, 0.5)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Aanmelden
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      <Dialog open={notification.open} onClose={handleCloseNotification} maxWidth="sm" fullWidth>
        <DialogContent sx={{ padding: 6, textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: '#4ade80', marginBottom: 3 }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3, whiteSpace: 'pre-line' }}>
            {notification.message}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: 4, justifyContent: 'center' }}>
          <Button onClick={handleCloseNotification} variant="contained" size="large">
            Geweldig! 🎉
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Contact;
