import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Chip, Button, Select, MenuItem, FormControl,
  Alert, CircularProgress, Card, CardContent, Grid
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import RefreshIcon from '@mui/icons-material/Refresh';
import { SEO } from '../utils/seo.jsx';

function AdminDashboard() {
  const navigate = useNavigate();
  const [aanmeldingen, setAanmeldingen] = useState([]);
  const [stats, setStats] = useState({ total: 0, byStatus: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    // Check of admin ingelogd is
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchAanmeldingen();
  }, [navigate]);

  const fetchAanmeldingen = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch('/api/admin/aanmeldingen', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        // Token verlopen of ongeldig
        handleLogout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fout bij ophalen data');
      }

      setAanmeldingen(data.data);
      setStats(data.stats);

    } catch (err) {
      setError(err.message || 'Er is een fout opgetreden');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdating(id);

    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch('/api/admin/update-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, status: newStatus })
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fout bij updaten status');
      }

      // Update lokale state
      setAanmeldingen(prev => 
        prev.map(item => 
          item.id === id ? { ...item, status: newStatus, updated_at: data.data.updated_at } : item
        )
      );

      // Update stats
      fetchAanmeldingen();

    } catch (err) {
      alert(err.message || 'Fout bij updaten status');
    } finally {
      setUpdating(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const getStatusColor = (status) => {
    const colors = {
      'nieuw': 'info',
      'in_behandeling': 'warning',
      'goedgekeurd': 'success',
      'afgewezen': 'error',
      'voltooid': 'default'
    };
    return colors[status] || 'default';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'nieuw': 'Nieuw',
      'in_behandeling': 'In Behandeling',
      'goedgekeurd': 'Goedgekeurd',
      'afgewezen': 'Afgewezen',
      'voltooid': 'Voltooid'
    };
    return labels[status] || status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('nl-NL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        title="Admin Dashboard | Hofmans Automotive Academie"
        description="Admin dashboard voor beheer van aanmeldingen"
        noindex={true}
      />

      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4, mb: 4 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Admin Dashboard
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Hofmans Automotive Academie - Aanmeldingen Beheer
              </Typography>
            </Box>
            <Box>
              <Button
                startIcon={<RefreshIcon />}
                onClick={fetchAanmeldingen}
                sx={{ mr: 2, color: 'white', borderColor: 'white' }}
                variant="outlined"
              >
                Ververs
              </Button>
              <Button
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{ color: 'white', borderColor: 'white' }}
                variant="outlined"
              >
                Uitloggen
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 6, pb: 10 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Totaal
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {stats.total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Nieuw
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                  {stats.byStatus?.nieuw || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  In Behandeling
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                  {stats.byStatus?.in_behandeling || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Goedgekeurd
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                  {stats.byStatus?.goedgekeurd || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Voltooid
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {stats.byStatus?.voltooid || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Aanmeldingen Tabel */}
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: 'grey.100' }}>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Naam</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Telefoon</strong></TableCell>
                <TableCell><strong>Training(s)</strong></TableCell>
                <TableCell><strong>Aangemeld op</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Acties</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aanmeldingen.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      Geen aanmeldingen gevonden
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                aanmeldingen.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      {[item.first_name, item.middle_name, item.last_name]
                        .filter(Boolean)
                        .join(' ')}
                    </TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 200 }}>
                        {Array.isArray(item.trainings) 
                          ? item.trainings.join(', ')
                          : item.trainings}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(item.created_at)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(item.status)}
                        color={getStatusColor(item.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <FormControl size="small" sx={{ minWidth: 150 }}>
                        <Select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          disabled={updating === item.id}
                        >
                          <MenuItem value="nieuw">Nieuw</MenuItem>
                          <MenuItem value="in_behandeling">In Behandeling</MenuItem>
                          <MenuItem value="goedgekeurd">Goedgekeurd</MenuItem>
                          <MenuItem value="afgewezen">Afgewezen</MenuItem>
                          <MenuItem value="voltooid">Voltooid</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

export default AdminDashboard;
