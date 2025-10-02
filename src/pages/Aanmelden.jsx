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

function Aanmelden() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    bsn: '',
    email: '',
    phone: '',
    orgName: '',
    contactName: '',
    contactEmail: '',
    training: [],
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [bsnError, setBsnError] = useState('');

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_jyo37pp';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_37a1ftj';
  const EMAILJS_AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || 'template_06x3cuo';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'rBcqZk3mmSP0xkpQh';

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    const selectedTraining = localStorage.getItem('selectedTraining');
    if (selectedTraining) {
      setFormData(prevState => ({
        ...prevState,
        training: [...prevState.training, selectedTraining]
      }));
      localStorage.removeItem('selectedTraining');
    }
  }, []);

  const validateBSN = (bsn) => {
    // Verwijder spaties en streepjes
    const cleaned = bsn.replace(/[\s-]/g, '');
    
    // Moet 8 of 9 cijfers zijn
    if (!/^\d{8,9}$/.test(cleaned)) {
      return false;
    }
    
    // Pad met 0 als het 8 cijfers zijn
    const bsnNumber = cleaned.padStart(9, '0');
    
    // 11-proef: vermenigvuldig elk cijfer met zijn positie (9,8,7,6,5,4,3,2,-1)
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      const multiplier = i === 8 ? -1 : 9 - i;
      sum += parseInt(bsnNumber[i]) * multiplier;
    }
    
    // Som moet deelbaar zijn door 11
    return sum % 11 === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // BSN validatie tijdens typen
    if (name === 'bsn') {
      if (value && !validateBSN(value)) {
        setBsnError('Ongeldig BSN nummer (moet voldoen aan 11-proef)');
      } else {
        setBsnError('');
      }
    }
    
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Controleer BSN voor verzending
    if (formData.bsn && !validateBSN(formData.bsn)) {
      setBsnError('Ongeldig BSN nummer. Controleer het nummer en probeer opnieuw.');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const selectedOptions = {
        'voertuigtechniek': 'Voertuigtechniek Werkplaats',
        'llo': 'Leven Lang Ontwikkelen (LLO)',
        'niet-technisch': 'Niet-Technisch Personeel',
        'nederlands-rekenen': 'Nederlands & Rekenen'
      };
      
      const selectedTrainings = formData.training.length > 0 
        ? formData.training.map(item => selectedOptions[item]).join(', ')
        : 'Geen specifieke training geselecteerd';

      const fullName = `${formData.firstName} ${formData.middleName} ${formData.lastName}`.replace(/\s+/g, ' ').trim();

      const templateParams = {
        from_name: fullName,
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        from_email: formData.email,
        phone: formData.phone,
        birth_date: formData.birthDate,
        birth_place: formData.birthPlace,
        bsn: formData.bsn,
        org_name: formData.orgName,
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        selected_trainings: selectedTrainings,
        message: formData.message,
        to_email: 'info@hofmansautomotiveacademie.nl'
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      const autoReplyTemplateParams = {
        to_name: fullName,
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

      setNotification({
        open: true,
        message: `🎉 Fantastisch ${fullName}!\n\nWat leuk dat je ons een bericht hebt gestuurd! We hebben je aanmelding voor "${selectedTrainings}" ontvangen.\n\nWe nemen zo spoedig mogelijk contact met je op voor verdere informatie. Tot snel! 🚀`,
        severity: 'success'
      });

      setFormData({ 
        firstName: '', middleName: '', lastName: '',
        birthDate: '', birthPlace: '', bsn: '',
        email: '', phone: '',
        orgName: '', contactName: '', contactEmail: '',
        training: [], message: ''
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
        title="Aanmelden | Hofmans Automotive Academie"
        description="Meld je direct aan voor een training bij Hofmans Automotive Academie. Vul het aanmeldformulier in en wij nemen contact met je op."
        keywords="aanmelden training, automotive opleiding aanmelden, Hofmans Automotive Academie"
        image="/assets/logo-hofmans.png"
        url="https://hofmansautomotiveacademie.github.io/aanmelden"
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
              Aanmelden voor Training
            </Typography>
            <Typography variant="h5" sx={{ maxWidth: '800px', margin: '0 auto', mt: 4 }}>
              Ben je klaar voor de volgende stap in je carrière? Vul het aanmeldformulier in en wij nemen zo snel mogelijk contact met je op.
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
                  Aanmeldformulier
                </Typography>
                
                <form onSubmit={handleSubmit} autoComplete="off">
                  <Box sx={{ mb: 2, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 0.6fr' }, gap: 2 }}>
                    <TextField 
                      label="Voornaam" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    />
                    <TextField 
                      label="Tussenvoegsel" 
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </Box>
                  
                  <TextField 
                    fullWidth
                    label="Achternaam" 
                    name="lastName"
                    value={formData.lastName}
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
                    label="Telefoonnummer" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    sx={{ mb: 2 }}
                  />

                  <Box sx={{ mb: 2, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <TextField 
                      label="Geboortedatum"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                      inputProps={{
                        'data-lpignore': 'true',
                        'data-form-type': 'other',
                        'data-1p-ignore': 'true'
                      }}
                    />
                    <TextField 
                      label="Geboorteplaats"
                      name="birthPlace"
                      value={formData.birthPlace}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                      inputProps={{
                        'data-lpignore': 'true',
                        'data-form-type': 'other'
                      }}
                    />
                  </Box>

                  <TextField 
                    fullWidth
                    label="BurgerServiceNummer"
                    name="bsn"
                    value={formData.bsn}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    error={!!bsnError}
                    helperText={bsnError || 'Moet voldoen aan 11-proef (8 of 9 cijfers)'}
                    sx={{ mb: 2 }}
                  />

                  <TextField 
                    fullWidth
                    label="Naam bedrijf/organisatie"
                    name="orgName"
                    value={formData.orgName}
                    onChange={handleChange}
                    autoComplete="off"
                    sx={{ mb: 2 }}
                  />
                  
                  <Box sx={{ mb: 2, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <TextField 
                      label="Naam contactpersoon"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <TextField 
                      label="E-mailadres contactpersoon"
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </Box>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Interesse in Training</InputLabel>
                    <Select
                      name="training"
                      value={formData.training}
                      onChange={handleChange}
                      label="Interesse in Training"
                      multiple
                      renderValue={(selected) => {
                        const options = {
                          'voertuigtechniek': 'Voertuigtechniek Werkplaats',
                          'llo': 'Leven Lang Ontwikkelen (LLO)',
                          'niet-technisch': 'Niet-Technisch Personeel',
                          'nederlands-rekenen': 'Nederlands & Rekenen'
                        };
                        return selected.map(item => options[item]).join(', ');
                      }}
                    >
                      <MenuItem value="voertuigtechniek">Voertuigtechniek Werkplaats</MenuItem>
                      <MenuItem value="llo">Leven Lang Ontwikkelen (LLO)</MenuItem>
                      <MenuItem value="niet-technisch">Niet-Technisch Personeel</MenuItem>
                      <MenuItem value="nederlands-rekenen">Nederlands & Rekenen</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <TextField 
                    fullWidth 
                    label="Bericht" 
                    name="message"
                    multiline
                    rows={4}
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
                    {isSubmitting ? 'Verzenden...' : 'Verstuur Aanmelding'}
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
                  <LocationOnIcon sx={{ marginRight: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Adres</Typography>
                    <Typography>Boskantse Broekstraat 3, 6603 LD Wijchen</Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 3 }}>
                  <EmailIcon sx={{ marginRight: 2, color: 'secondary.main' }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>E-mail</Typography>
                    <Typography>support@hofmansautomotiveacademie.nl</Typography>
                    <Typography>h.lombarts@hofmansautomotiveacademie.nl</Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 3 }}>
                  <PhoneIcon sx={{ marginRight: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Telefoon</Typography>
                    <Typography>+31 (0)24 641 32 22</Typography>
                  </Box>
                </Box>
                
                <Box sx={{ marginTop: 5, padding: 2, borderRadius: 2, backgroundColor: alpha(theme.palette.grey[100], 0.5) }}>
                  <Typography variant="body2">
                    <strong>KVK-nummer:</strong> 97469785
                  </Typography>
                  <Typography variant="body2">
                    © 2024 Hofmans Automotive Academie. Alle rechten voorbehouden.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      <Dialog open={notification.open} onClose={handleCloseNotification} maxWidth="sm" fullWidth>
        <DialogContent sx={{ padding: 6, textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: '#4ade80', marginBottom: 3 }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
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

export default Aanmelden;
