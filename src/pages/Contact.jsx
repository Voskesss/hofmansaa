import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, TextField, Button, Grid, Card, CardContent, Select, MenuItem, InputLabel, FormControl, Dialog, DialogContent, DialogActions } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { SEO } from '../utils/seo.jsx';
import emailjs from '@emailjs/browser';

function Contact() {
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
      console.error('Error sending email:', error);
      setNotification({
        open: true,
        message: 'Er is een fout opgetreden bij het verzenden van je bericht. Probeer het opnieuw of neem direct contact met ons op.',
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
      <Box sx={{ background: 'linear-gradient(to right, #1e3a8a, #3b82f6)', color: 'white', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'url(https://hofmansautomotiveacademie.nl/wp-content/uploads/2023/11/Hofmans-Automotive-Academy-1024x683.jpg) no-repeat center center/cover', 
          opacity: 0.2, 
          zIndex: 0 
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            Neem Contact Op & Meld Je Aan
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            Ben je klaar voor de volgende stap in je carrière? Vul het formulier in en wij nemen zo snel mogelijk contact met je op.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ padding: '80px 0' }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, height: '100%', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' } }}>
              <CardContent sx={{ padding: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3, color: 'primary.main' }}>
                  Aanmeldformulier
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField 
                    fullWidth 
                    margin="normal" 
                    label="Naam" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    variant="outlined"
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 1 }}
                  />
                  <TextField 
                    fullWidth 
                    margin="normal" 
                    label="E-mail" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    variant="outlined"
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 1 }}
                  />
                  <TextField 
                    fullWidth 
                    margin="normal" 
                    label="Telefoonnummer" 
                    name="phone" 
                    type="tel" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    variant="outlined"
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 1 }}
                  />
                  <FormControl 
                    fullWidth 
                    margin="normal" 
                    variant="outlined"
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: 1,
                      minWidth: 200
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
                  <TextField 
                    fullWidth 
                    margin="normal" 
                    label="Bericht" 
                    name="message" 
                    multiline 
                    rows={4} 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    variant="outlined"
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 1 }}
                  />
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="secondary" 
                    size="large" 
                    endIcon={<SendIcon />} 
                    sx={{ marginTop: 3, width: '100%', padding: '14px 0', fontSize: '1.1rem' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Verzenden...' : 'Verzenden'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, height: '100%', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' } }}>
              <CardContent sx={{ padding: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3, color: 'primary.main' }}>
                  Contactgegevens
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 3 }}>
                  <LocationOnIcon sx={{ fontSize: 32, color: 'primary.main', marginRight: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Adres</Typography>
                    <Typography variant="body1">Boskantse Broekstraat 3, 6603 LD Wijchen</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 3 }}>
                  <EmailIcon sx={{ fontSize: 32, color: 'primary.main', marginRight: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>E-mail</Typography>
                    <Typography variant="body1">Aanmeldingen & Vragen: <a href="mailto:support@hofmansautomotiveacademie.nl">support@hofmansautomotiveacademie.nl</a></Typography>
                    <Typography variant="body1">Ondersteuning: <a href="mailto:h.lombarts@hofmansautomotiveacademie.nl">h.lombarts@hofmansautomotiveacademie.nl</a></Typography>
                  </Box>
                </Box>
                <Box sx={{ marginTop: 5 }}>
                  <Typography variant="body2" sx={{ marginTop: 2 }}>KVK-nummer: 97469785</Typography>
                  <Typography variant="body2"> 2024 Hofmans Automotive Academie. Alle rechten voorbehouden.</Typography>
                </Box>
              </CardContent>
            </Card>
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
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
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
