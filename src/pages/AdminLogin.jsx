import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Card, CardContent, TextField, Button, Typography, Alert } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { SEO } from '../utils/seo.jsx';

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login mislukt');
      }

      // Sla token op in localStorage
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));

      // Redirect naar dashboard
      navigate('/admin/dashboard');

    } catch (err) {
      setError(err.message || 'Er is een fout opgetreden bij het inloggen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <SEO 
        title="Admin Login | Hofmans Automotive Academie"
        description="Admin login voor Hofmans Automotive Academie"
        noindex={true}
      />
      
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #006BB2 0%, #003d66 100%)'
      }}>
        <Container maxWidth="sm">
          <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
            <CardContent sx={{ p: 5 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <LockIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  Admin Login
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Hofmans Automotive Academie
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Gebruikersnaam"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Wachtwoord"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  sx={{ mb: 3 }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  sx={{ py: 1.5 }}
                >
                  {loading ? 'Inloggen...' : 'Inloggen'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

export default AdminLogin;
