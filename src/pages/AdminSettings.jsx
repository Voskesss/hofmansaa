import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Paper, Switch, FormControlLabel,
  Alert, CircularProgress, Button, Card, CardContent, Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { SEO } from '../utils/seo.jsx';

function AdminSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchSettings();
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
      </Container>
    </Box>
  );
}

export default AdminSettings;
