import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Paper, Switch, FormControlLabel,
  Alert, CircularProgress, Button, Card, CardContent, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SEO } from '../utils/seo.jsx';

function AdminSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({});
  const [trainingen, setTrainingen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Training dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState(null);
  const [trainingForm, setTrainingForm] = useState({
    key: '',
    naam: '',
    beschrijving: '',
    heeft_sessies: false,
    toon_in_contact: false,
    volgorde: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchSettings();
    fetchTrainingen();
  }, [navigate]);

  const fetchSettings = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/settings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        navigate('/admin/login');
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fout bij ophalen settings');
      }

      // Convert array to object for easy access
      const settingsObj = {};
      data.data.forEach(item => {
        settingsObj[item.setting_key] = item.setting_value === 'true';
      });
      setSettings(settingsObj);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrainingen = async () => {
    try {
      const response = await fetch('/api/admin/trainingen');
      const data = await response.json();
      if (data.success) {
        setTrainingen(data.data || []);
      } else {
        // Tabel bestaat mogelijk nog niet
        setTrainingen([]);
      }
    } catch (err) {
      console.error('Fout bij ophalen trainingen:', err);
      setTrainingen([]);
    }
  };

  const handleOpenDialog = (training = null) => {
    if (training) {
      setEditingTraining(training);
      setTrainingForm({
        key: training.key,
        naam: training.naam,
        beschrijving: training.beschrijving || '',
        heeft_sessies: training.heeft_sessies,
        toon_in_contact: training.toon_in_contact,
        volgorde: training.volgorde
      });
    } else {
      setEditingTraining(null);
      setTrainingForm({
        key: '',
        naam: '',
        beschrijving: '',
        heeft_sessies: false,
        toon_in_contact: false,
        volgorde: trainingen.length
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTraining(null);
  };

  const handleSaveTraining = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const method = editingTraining ? 'PUT' : 'POST';
      const body = editingTraining 
        ? { ...trainingForm, id: editingTraining.id }
        : trainingForm;

      const response = await fetch('/api/admin/trainingen', {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(data.message);
        setTimeout(() => setSuccess(''), 3000);
        handleCloseDialog();
        fetchTrainingen();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTraining = async (id, naam) => {
    if (!window.confirm(`Weet je zeker dat je "${naam}" wilt verwijderen?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/trainingen?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(data.message);
        setTimeout(() => setSuccess(''), 3000);
        fetchTrainingen();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');

      // Update session_selection_enabled
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          setting_key: 'session_selection_enabled',
          setting_value: settings.session_selection_enabled ? 'true' : 'false'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fout bij opslaan settings');
      }

      setSuccess('Settings succesvol opgeslagen!');
      setTimeout(() => setSuccess(''), 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <SEO 
        title="Instellingen | Admin Dashboard"
        description="Systeem instellingen beheren"
        noindex={true}
      />

      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4, mt: 8, mb: 4 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Systeem Instellingen
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Beheer globale instellingen voor het aanmeldsysteem
              </Typography>
            </Box>
            <Box>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/admin/dashboard')}
                sx={{ color: 'white', borderColor: 'white' }}
                variant="outlined"
              >
                Dashboard
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 3, pb: 8 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Aanmelding Instellingen
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ my: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.session_selection_enabled || false}
                    onChange={() => handleToggle('session_selection_enabled')}
                    color="primary"
                    size="medium"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      Sessie Selectie Actief
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {settings.session_selection_enabled 
                        ? 'Kandidaten moeten een beschikbare sessie kiezen bij aanmelding'
                        : 'Kandidaten zien geen sessie keuze (admin wijst sessies toe)'
                      }
                    </Typography>
                  </Box>
                }
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  ml: 0,
                  '& .MuiFormControlLabel-label': { mt: 1 }
                }}
              />
            </Box>

            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={saving}
                size="large"
              >
                {saving ? 'Opslaan...' : 'Opslaan'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/admin/dashboard')}
              >
                Annuleren
              </Button>
            </Box>

            <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                <strong>Let op:</strong> Als je sessie selectie activeert, zorg ervoor dat je voldoende 
                sessies hebt aangemaakt met "Inschrijving AAN". Kandidaten kunnen alleen kiezen uit 
                beschikbare sessies.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Trainingen Beheer */}
        <Card sx={{ mt: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5">
                Trainingen Beheer
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
              >
                Nieuwe Training
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Naam</strong></TableCell>
                    <TableCell><strong>Heeft Sessies</strong></TableCell>
                    <TableCell><strong>In Contactformulier</strong></TableCell>
                    <TableCell><strong>Volgorde</strong></TableCell>
                    <TableCell align="right"><strong>Acties</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trainingen.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                        <Typography color="text.secondary" gutterBottom>
                          Geen trainingen gevonden.
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={async () => {
                            try {
                              const token = localStorage.getItem('adminToken');
                              const response = await fetch('/api/admin/trainingen?setup=true', {
                                headers: { 'Authorization': `Bearer ${token}` }
                              });
                              const data = await response.json();
                              if (data.success) {
                                setSuccess('Database tabel aangemaakt! Trainingen geladen.');
                                setTimeout(() => setSuccess(''), 3000);
                                fetchTrainingen();
                              }
                            } catch (err) {
                              setError('Fout bij setup: ' + err.message);
                            }
                          }}
                          sx={{ mt: 2 }}
                        >
                          🔧 Database Tabel Aanmaken
                        </Button>
                      </TableCell>
                    </TableRow>
                  ) : (
                    trainingen.map((training) => (
                      <TableRow key={training.id} hover>
                        <TableCell>
                          <Typography variant="body1" fontWeight="bold">
                            {training.naam}
                          </Typography>
                          {training.beschrijving && (
                            <Typography variant="caption" color="text.secondary">
                              {training.beschrijving}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Checkbox checked={training.heeft_sessies} disabled />
                        </TableCell>
                        <TableCell>
                          <Checkbox checked={training.toon_in_contact} disabled />
                        </TableCell>
                        <TableCell>{training.volgorde}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(training)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteTraining(training.id, training.naam)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Training Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingTraining ? 'Training Bewerken' : 'Nieuwe Training'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Key (technische naam, kleine letters, geen spaties)"
                fullWidth
                value={trainingForm.key}
                onChange={(e) => setTrainingForm({ ...trainingForm, key: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                required
                helperText="Bijv: nederlands-rekenen, voertuigen, llo"
                placeholder="nederlands-rekenen"
              />
              <TextField
                label="Naam (weergave)"
                fullWidth
                value={trainingForm.naam}
                onChange={(e) => setTrainingForm({ ...trainingForm, naam: e.target.value })}
                required
              />
              <TextField
                label="Beschrijving"
                fullWidth
                multiline
                rows={2}
                value={trainingForm.beschrijving}
                onChange={(e) => setTrainingForm({ ...trainingForm, beschrijving: e.target.value })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={trainingForm.heeft_sessies}
                    onChange={(e) => setTrainingForm({ ...trainingForm, heeft_sessies: e.target.checked })}
                  />
                }
                label="Heeft toetsmomenten/sessies (toon in aanmeldformulier)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={trainingForm.toon_in_contact}
                    onChange={(e) => setTrainingForm({ ...trainingForm, toon_in_contact: e.target.checked })}
                  />
                }
                label="Toon in contactformulier"
              />
              <TextField
                label="Volgorde"
                type="number"
                fullWidth
                value={trainingForm.volgorde}
                onChange={(e) => setTrainingForm({ ...trainingForm, volgorde: parseInt(e.target.value) })}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuleren</Button>
            <Button onClick={handleSaveTraining} variant="contained">
              Opslaan
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default AdminSettings;
