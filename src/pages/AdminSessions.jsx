import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Select, MenuItem, FormControl, InputLabel,
  Alert, Chip, IconButton, Grid, Switch, FormControlLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SEO } from '../utils/seo.jsx';

const TRAINING_TYPES = {
  'llo': 'LLO',
  'voertuigtechniek': 'Voertuigtechniek',
  'nederlands-rekenen': 'Nederlands & Rekenen',
  'niet-technisch': 'Niet-technisch'
};

function AdminSessions() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [updatingRegistration, setUpdatingRegistration] = useState(null);
  
  const [formData, setFormData] = useState({
    training_type: '',
    session_date: '',
    start_time: '',
    end_time: '',
    location: '',
    max_participants: 12,
    description: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchSessions();
  }, [navigate]);

  const fetchSessions = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/sessions', {
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
        throw new Error(data.error || 'Fout bij ophalen sessies');
      }

      setSessions(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (session = null) => {
    if (session) {
      setEditingSession(session);
      setFormData({
        training_type: session.training_type,
        session_date: session.session_date.split('T')[0],
        start_time: session.start_time.substring(0, 5),
        end_time: session.end_time.substring(0, 5),
        location: session.location,
        max_participants: session.max_participants,
        description: session.description || ''
      });
    } else {
      setEditingSession(null);
      setFormData({
        training_type: '',
        session_date: '',
        start_time: '09:00',
        end_time: '17:00',
        location: 'Hofmans Academie Utrecht',
        max_participants: 12,
        description: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSession(null);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const method = editingSession ? 'PUT' : 'POST';
      const body = editingSession 
        ? { ...formData, id: editingSession.id }
        : formData;

      const response = await fetch('/api/admin/sessions', {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fout bij opslaan sessie');
      }

      handleCloseDialog();
      fetchSessions();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingStatus(id);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/sessions', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, status: newStatus })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Fout bij updaten status');
      }

      setSessions(prev => 
        prev.map(session => 
          session.id === id ? { ...session, status: newStatus } : session
        )
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleRegistrationToggle = async (id, currentValue) => {
    setUpdatingRegistration(id);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/sessions', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, allow_public_registration: !currentValue })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Fout bij updaten inschrijving');
      }

      setSessions(prev => 
        prev.map(session => 
          session.id === id ? { ...session, allow_public_registration: !currentValue } : session
        )
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingRegistration(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Weet je zeker dat je deze sessie wilt verwijderen?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/sessions?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fout bij verwijderen sessie');
      }

      fetchSessions();
    } catch (err) {
      alert(err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (session) => {
    const registered = parseInt(session.registered_count) || 0;
    const max = session.max_participants;
    
    if (registered >= max) return 'error';
    if (registered >= max * 0.8) return 'warning';
    return 'success';
  };

  if (loading) {
    return (
      <Container>
        <Typography>Laden...</Typography>
      </Container>
    );
  }

  return (
    <Box>
      <SEO 
        title="Sessies Beheer | Admin Dashboard"
        description="Beheer training sessies en planning"
        noindex={true}
      />

      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4, mt: 8, mb: 4 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Sessies Beheer
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Planning en beschikbaarheid van trainingen
              </Typography>
            </Box>
            <Box>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/admin/dashboard')}
                sx={{ mr: 2, color: 'white', borderColor: 'white' }}
                variant="outlined"
              >
                Terug
              </Button>
              <Button
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
                sx={{ color: 'white', borderColor: 'white' }}
                variant="outlined"
              >
                Nieuwe Sessie
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 3, pb: 8 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: 'grey.100' }}>
              <TableRow>
                <TableCell><strong>Training</strong></TableCell>
                <TableCell><strong>Datum</strong></TableCell>
                <TableCell><strong>Tijd</strong></TableCell>
                <TableCell><strong>Locatie</strong></TableCell>
                <TableCell><strong>Deelnemers</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Inschrijving</strong></TableCell>
                <TableCell align="right"><strong>Acties</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      Geen sessies gevonden. Maak een nieuwe sessie aan.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                sessions.map((session) => (
                  <TableRow key={session.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {TRAINING_TYPES[session.training_type] || session.training_type}
                      </Typography>
                      {session.description && (
                        <Typography variant="caption" color="text.secondary">
                          {session.description}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(session.session_date)}</TableCell>
                    <TableCell>
                      {session.start_time.substring(0, 5)} - {session.end_time.substring(0, 5)}
                    </TableCell>
                    <TableCell>{session.location}</TableCell>
                    <TableCell>
                      <Chip
                        icon={<PeopleIcon />}
                        label={`${session.registered_count || 0} / ${session.max_participants}`}
                        color={getStatusColor(session)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <FormControl size="small" sx={{ minWidth: 150 }}>
                        <Select
                          value={session.status}
                          onChange={(e) => handleStatusUpdate(session.id, e.target.value)}
                          disabled={updatingStatus === session.id}
                        >
                          <MenuItem value="open">Open</MenuItem>
                          <MenuItem value="vol">Vol</MenuItem>
                          <MenuItem value="geannuleerd">Geannuleerd</MenuItem>
                          <MenuItem value="voltooid">Voltooid</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={session.allow_public_registration !== false}
                            onChange={() => handleRegistrationToggle(session.id, session.allow_public_registration)}
                            disabled={updatingRegistration === session.id}
                            color="primary"
                          />
                        }
                        label={session.allow_public_registration !== false ? 'Aan' : 'Uit'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/admin/sessions/${session.id}`)}
                        color="primary"
                        title="Bekijk deelnemers"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(session)}
                        color="primary"
                        title="Bewerk sessie"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(session.id)}
                        color="error"
                        disabled={parseInt(session.registered_count) > 0}
                        title="Verwijder sessie"
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
      </Container>

      {/* Dialog voor toevoegen/bewerken */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingSession ? 'Sessie Bewerken' : 'Nieuwe Sessie Aanmaken'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Training Type</InputLabel>
                <Select
                  value={formData.training_type}
                  label="Training Type"
                  onChange={(e) => setFormData({ ...formData, training_type: e.target.value })}
                >
                  {Object.entries(TRAINING_TYPES).map(([key, label]) => (
                    <MenuItem key={key} value={key}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Datum"
                type="date"
                value={formData.session_date}
                onChange={(e) => setFormData({ ...formData, session_date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Tijd"
                type="time"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Eind Tijd"
                type="time"
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Locatie"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Max Deelnemers"
                type="number"
                value={formData.max_participants}
                onChange={(e) => setFormData({ ...formData, max_participants: parseInt(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Beschrijving"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuleren</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingSession ? 'Bijwerken' : 'Aanmaken'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminSessions;
