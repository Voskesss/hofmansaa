import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, TextField, Button, Grid, Card, CardContent, Select, MenuItem, InputLabel, FormControl, Dialog, DialogContent, DialogActions, useTheme, alpha, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import { SEO } from '../utils/seo.jsx';
import { initEmailJS, sendAanmeldEmail } from '../utils/emailService';

function Aanmelden() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    email: '',
    phone: '',
    street: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    country: 'Nederland',
    orgName: '',
    contactName: '',
    contactEmail: '',
    training: [],
    message: '',
    sessionId: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [sessionSelectionEnabled, setSessionSelectionEnabled] = useState(false);
  const [availableSessions, setAvailableSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [allTrainingen, setAllTrainingen] = useState([]);
  const [uniqueTrainingen, setUniqueTrainingen] = useState([]);
  const [trainingLookup, setTrainingLookup] = useState({}); // key -> naam mapping

  useEffect(() => {
    initEmailJS();
    const loadData = async () => {
      await fetchSettings(); // Eerst settings laden
      await fetchAllSessions(); // Dan sessies
    };
    loadData();
  }, []);

  const fetchAllSessions = async () => {
    try {
      // Haal sessies en trainingen op
      const [sessionsRes, trainingenRes] = await Promise.all([
        fetch('/api/sessions/available'),
        fetch('/api/admin/trainingen?filter=sessies')
      ]);
      
      const sessionsData = await sessionsRes.json();
      const trainingenData = await trainingenRes.json();
      
      if (sessionsData.success && trainingenData.success) {
        // Maak lookup map: key -> naam
        const lookup = {};
        trainingenData.data.forEach(t => {
          lookup[t.key] = t.naam;
        });
        setTrainingLookup(lookup);
        
        // Haal unieke training keys op uit beschikbare sessies
        const unique = [...new Set(sessionsData.data.map(s => s.training_type))].filter(Boolean);
        setUniqueTrainingen(unique);
        
        // Als er maar 1 training is, selecteer deze automatisch
        if (unique.length === 1) {
          setFormData(prev => ({
            ...prev,
            training: sessionSelectionEnabled ? unique[0] : [unique[0]]
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching all sessions:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings?key=session_selection_enabled');
      const data = await response.json();
      if (data.success && data.data) {
        setSessionSelectionEnabled(data.data.setting_value === 'true');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  useEffect(() => {
    const selectedTraining = localStorage.getItem('selectedTraining');
    if (selectedTraining) {
      setFormData(prevState => ({
        ...prevState,
        training: Array.isArray(prevState.training) 
          ? [...prevState.training, selectedTraining]
          : selectedTraining
      }));
      localStorage.removeItem('selectedTraining');
    }
  }, []);

  // Reset training field wanneer session selection mode verandert
  useEffect(() => {
    // Skip reset als training al een waarde heeft (bijv. auto-selected)
    if (formData.training && 
        ((sessionSelectionEnabled && typeof formData.training === 'string') ||
         (!sessionSelectionEnabled && Array.isArray(formData.training)))) {
      return; // Training format is al correct
    }
    
    setFormData(prev => ({
      ...prev,
      training: sessionSelectionEnabled ? '' : [],
      sessionId: null
    }));
  }, [sessionSelectionEnabled]);

  useEffect(() => {
    // Check: als single select (string) of multiple select (array met items)
    const hasTraining = sessionSelectionEnabled 
      ? (typeof formData.training === 'string' && formData.training !== '')
      : (Array.isArray(formData.training) && formData.training.length > 0);
    
    if (sessionSelectionEnabled && hasTraining) {
      fetchAvailableSessions();
    } else {
      setAvailableSessions([]);
      setFormData(prev => ({ ...prev, sessionId: null }));
    }
  }, [sessionSelectionEnabled, formData.training]);

  const fetchAvailableSessions = async () => {
    setLoadingSessions(true);
    try {
      // Training type: als single select is het een string, als multiple een array
      const trainingType = typeof formData.training === 'string' 
        ? formData.training 
        : formData.training[0];
      
      const response = await fetch(`/api/sessions/available?training_type=${trainingType}`);
      const data = await response.json();
      if (data.success) {
        setAvailableSessions(data.data);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoadingSessions(false);
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
      const selectedOptions = {
        'voertuigtechniek': 'Voertuigtechniek Werkplaats',
        'llo': 'Leven Lang Ontwikkelen (LLO)',
        'niet-technisch': 'Niet-Technisch Personeel',
        'nederlands-rekenen': 'Nederlands & Rekenen'
      };
      
      // Handle both single (string) and multiple (array) training selection
      const selectedTrainings = typeof formData.training === 'string'
        ? selectedOptions[formData.training] || formData.training
        : formData.training.length > 0 
          ? formData.training.map(item => selectedOptions[item]).join(', ')
          : 'Geen specifieke training geselecteerd';

      const fullName = `${formData.firstName} ${formData.middleName} ${formData.lastName}`.replace(/\s+/g, ' ').trim();

      let savedToDatabase = false;

      // Probeer eerst backend API (als we op Vercel draaien of lokaal met vercel dev)
      try {
        const apiResponse = await fetch('/api/aanmelden', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        const apiResult = await apiResponse.json();
        
        if (apiResult.success && apiResult.savedToDatabase) {
          savedToDatabase = true;
          console.log('✅ Aanmelding opgeslagen in database:', apiResult.data);
        } else {
          console.warn('⚠️ Database opslag mislukt, gebruik EmailJS fallback');
        }
      } catch (apiError) {
        // API niet beschikbaar (bijv. op GitHub Pages) - gebruik EmailJS
        console.warn('⚠️ Backend API niet bereikbaar, gebruik EmailJS:', apiError.message);
      }

      // Sessie info ophalen als sessie gekozen
      let sessionInfo = null;
      if (formData.sessionId && availableSessions.length > 0) {
        const selectedSession = availableSessions.find(s => s.id === formData.sessionId);
        if (selectedSession) {
          sessionInfo = {
            date: new Date(selectedSession.session_date).toLocaleDateString('nl-NL', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long',
              year: 'numeric'
            }),
            time: `${selectedSession.start_time.substring(0,5)} - ${selectedSession.end_time.substring(0,5)}`,
            location: selectedSession.location,
            training: selectedSession.training_type
          };
        }
      }

      // Verstuur email via EmailJS (altijd, ook als database werkt)
      await sendAanmeldEmail(formData, selectedTrainings, sessionInfo);

      setNotification({
        open: true,
        message: `🎉 Fantastisch ${fullName}!\n\nWat leuk dat je ons een bericht hebt gestuurd! We hebben je aanmelding voor "${selectedTrainings}" ontvangen.\n\nWe nemen zo spoedig mogelijk contact met je op voor verdere informatie. Tot snel! 🚀`,
        severity: 'success'
      });

      setFormData({ 
        firstName: '', middleName: '', lastName: '',
        birthDate: '', birthPlace: '',
        email: '', phone: '',
        street: '', houseNumber: '', postalCode: '', city: '', country: 'Nederland',
        orgName: '', contactName: '', contactEmail: '',
        training: sessionSelectionEnabled ? '' : [], 
        message: '', 
        sessionId: null
      });

    } catch (error) {
      console.error('Aanmelding Error:', error);
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

      <Container maxWidth="lg" sx={{ padding: { xs: '40px 16px', md: '80px 0' } }}>
        <Grid container spacing={{ xs: 2, md: 6 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent sx={{ padding: { xs: 2, sm: 3, md: 5 } }}>
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


                  <Typography variant="h6" sx={{ mt: 3, mb: 2, color: 'primary.main', fontWeight: 600 }}>
                    📍 Adresgegevens
                  </Typography>

                  <Box sx={{ mb: 2, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' }, gap: 2 }}>
                    <TextField 
                      label="Straatnaam"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                      autoComplete="street-address"
                    />
                    <TextField 
                      label="Huisnummer"
                      name="houseNumber"
                      value={formData.houseNumber}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    />
                  </Box>

                  <Box sx={{ mb: 2, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 2fr' }, gap: 2 }}>
                    <TextField 
                      label="Postcode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      autoComplete="postal-code"
                      placeholder="1234 AB"
                    />
                    <TextField 
                      label="Plaats"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      autoComplete="address-level2"
                    />
                  </Box>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Land</InputLabel>
                    <Select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      label="Land"
                      required
                    >
                      <MenuItem value="Nederland">Nederland</MenuItem>
                      <MenuItem value="België">België</MenuItem>
                      <MenuItem value="Duitsland">Duitsland</MenuItem>
                      <MenuItem value="Frankrijk">Frankrijk</MenuItem>
                      <MenuItem value="Luxemburg">Luxemburg</MenuItem>
                      <MenuItem value="Anders">Anders</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography variant="h6" sx={{ mt: 3, mb: 2, color: 'primary.main', fontWeight: 600 }}>
                    🏢 Organisatiegegevens (optioneel)
                  </Typography>

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

                  {/* Training/Toetsing Selectie */}
                  {uniqueTrainingen.length === 1 ? (
                    // Slechts 1 training beschikbaar - toon disabled field
                    <TextField
                      fullWidth
                      label="Training/Toetsing"
                      value={trainingLookup[uniqueTrainingen[0]] || uniqueTrainingen[0]}
                      disabled
                      sx={{ mb: 2 }}
                      helperText="Er is momenteel slechts 1 training/toetsing beschikbaar"
                    />
                  ) : uniqueTrainingen.length > 1 ? (
                    // Meerdere trainingen - toon dropdown
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>
                        {sessionSelectionEnabled 
                          ? 'Kies Training/Toetsing *' 
                          : 'Interesse in Training (meerdere mogelijk)'}
                      </InputLabel>
                      <Select
                        name="training"
                        value={formData.training}
                        onChange={handleChange}
                        label={sessionSelectionEnabled 
                          ? 'Kies Training/Toetsing *' 
                          : 'Interesse in Training (meerdere mogelijk)'}
                        multiple={!sessionSelectionEnabled}
                        renderValue={!sessionSelectionEnabled ? (selected) => {
                          return Array.isArray(selected) ? selected.map(key => trainingLookup[key] || key).join(', ') : (trainingLookup[selected] || selected);
                        } : (selected) => trainingLookup[selected] || selected}
                        required
                      >
                        {uniqueTrainingen.map((trainingKey) => (
                          <MenuItem key={trainingKey} value={trainingKey}>
                            {trainingLookup[trainingKey] || trainingKey}
                          </MenuItem>
                        ))}
                      </Select>
                      {sessionSelectionEnabled && (
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                          Kies de training/toetsing waarvoor je een moment wilt reserveren
                        </Typography>
                      )}
                    </FormControl>
                  ) : (
                    // Geen trainingen beschikbaar
                    <TextField
                      fullWidth
                      label="Training/Toetsing"
                      value="Geen trainingen beschikbaar"
                      disabled
                      sx={{ mb: 2 }}
                      error
                      helperText="Er zijn momenteel geen trainingen/toetsingen beschikbaar"
                    />
                  )}

                  {/* Sessie Selectie (conditionally shown) */}
                  {sessionSelectionEnabled && formData.training && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
                        📅 Welke datum past jou het beste?
                      </Typography>
                      <FormControl fullWidth>
                        <InputLabel>Kies je voorkeursmoment *</InputLabel>
                        <Select
                          name="sessionId"
                          value={formData.sessionId || ''}
                          onChange={handleChange}
                          label="Kies je voorkeursmoment *"
                          required={availableSessions.length > 0}
                          disabled={loadingSessions || availableSessions.length === 0}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 300,
                                width: 'auto'
                              }
                            }
                          }}
                      >
                        {loadingSessions ? (
                          <MenuItem disabled>Sessies laden...</MenuItem>
                        ) : availableSessions.length === 0 ? (
                          <MenuItem disabled>Geen beschikbare sessies voor deze training</MenuItem>
                        ) : (
                          availableSessions.map((session) => (
                            <MenuItem key={session.id} value={session.id} sx={{ whiteSpace: 'normal', py: 1.5 }}>
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {new Date(session.session_date).toLocaleDateString('nl-NL', { 
                                    weekday: 'short', 
                                    day: 'numeric', 
                                    month: 'short',
                                    year: 'numeric'
                                  })} - {session.start_time.substring(0,5)} tot {session.end_time.substring(0,5)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {session.location && `${session.location}`}
                                  {session.available_spots !== undefined && ` (${session.available_spots} plekken beschikbaar)`}
                                </Typography>
                              </Box>
                            </MenuItem>
                          ))
                        )}
                      </Select>
                      {!loadingSessions && availableSessions.length === 0 && (
                        <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                          <Typography variant="body2" color="info.dark" fontWeight="bold" gutterBottom>
                            📅 Geen beschikbare sessies
                          </Typography>
                          <Typography variant="body2" color="info.dark">
                            Er zijn momenteel geen openbare sessies voor deze training. 
                            Vul het formulier in en wij nemen contact met je op om een datum in te plannen!
                          </Typography>
                        </Box>
                      )}
                      </FormControl>
                    </Box>
                  )}
                  
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
                    endIcon={isSubmitting ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <SendIcon />}
                    disabled={isSubmitting}
                    sx={{
                      position: 'relative',
                      '&.Mui-disabled': {
                        backgroundColor: 'primary.main',
                        opacity: 0.8
                      }
                    }}
                  >
                    {isSubmitting ? 'Bezig met verzenden...' : 'Verstuur Aanmelding'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent sx={{ padding: { xs: 2, sm: 3, md: 5 } }}>
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
