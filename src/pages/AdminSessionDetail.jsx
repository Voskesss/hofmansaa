import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Select, MenuItem, FormControl, InputLabel,
  Alert, Chip, Checkbox, IconButton, Grid, Card, CardContent, Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { SEO } from '../utils/seo.jsx';

function AdminSessionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [allSessions, setAllSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Dialogs
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [targetSessionId, setTargetSessionId] = useState('');
  
  // Add participant form - volledig zoals aanmeldformulier
  const [newParticipant, setNewParticipant] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    bsn: '',
    email: '',
    phone: '',
    street: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    country: 'Nederland',
    message: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchSessionDetails();
    fetchAllSessions();
  }, [id, navigate]);

  const fetchSessionDetails = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/session-participants?sessionId=${id}`, {
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
        throw new Error(data.error || 'Fout bij ophalen sessie details');
      }

      setSession(data.session);
      setParticipants(data.participants);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSessions = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/sessions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAllSessions(data.data.filter(s => s.id !== parseInt(id)));
      }
    } catch (err) {
      console.error('Error fetching sessions:', err);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(participants.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleMoveParticipants = async () => {
    if (!targetSessionId || selectedIds.length === 0) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/session-participants', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'move',
          participantIds: selectedIds,
          targetSessionId: parseInt(targetSessionId)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fout bij verplaatsen');
      }

      alert(data.message);
      setMoveDialogOpen(false);
      setSelectedIds([]);
      setTargetSessionId('');
      fetchSessionDetails();

    } catch (err) {
      alert(err.message);
    }
  };

  const handleDuplicateParticipants = async () => {
    if (!targetSessionId || selectedIds.length === 0) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/session-participants', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'duplicate',
          participantIds: selectedIds,
          targetSessionId: parseInt(targetSessionId)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fout bij dupliceren');
      }

      alert(data.message);
      setDuplicateDialogOpen(false);
      setSelectedIds([]);
      setTargetSessionId('');

    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddParticipant = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/session-participants', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: parseInt(id),
          ...newParticipant,
          training: session?.training_type || 'Niet opgegeven' // Auto-fill training
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fout bij toevoegen deelnemer');
      }

      alert(data.message);
      setAddDialogOpen(false);
      // Reset form
      setNewParticipant({
        firstName: '',
        middleName: '',
        lastName: '',
        birthDate: '',
        birthPlace: '',
        bsn: '',
        email: '',
        phone: '',
        street: '',
        houseNumber: '',
        postalCode: '',
        city: '',
        country: 'Nederland',
        message: ''
      });
      fetchSessionDetails();

    } catch (err) {
      alert(err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Container>
        <Typography>Laden...</Typography>
      </Container>
    );
  }

  if (!session) {
    return (
      <Container>
        <Typography>Sessie niet gevonden</Typography>
      </Container>
    );
  }

  return (
    <Box>
      <SEO 
        title={`Sessie Details | Admin Dashboard`}
        description="Beheer deelnemers van training sessie"
        noindex={true}
      />

      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4, mt: 8, mb: 4 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Sessie Deelnemers
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {formatDate(session.session_date)} - {session.start_time?.substring(0,5)} tot {session.end_time?.substring(0,5)}
              </Typography>
            </Box>
            <Box>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/admin/sessions')}
                sx={{ color: 'white', borderColor: 'white' }}
                variant="outlined"
              >
                Terug
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

        {/* Sessie Info Card */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary">Training</Typography>
                <Typography variant="h6">{session.training_type}</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary">Locatie</Typography>
                <Typography variant="h6">{session.location}</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary">Deelnemers</Typography>
                <Typography variant="h6">
                  {session.participant_count} / {session.max_participants}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary">Status</Typography>
                <Chip label={session.status} color="primary" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            startIcon={<PersonAddIcon />}
            variant="contained"
            onClick={() => setAddDialogOpen(true)}
          >
            Nieuwe Deelnemer
          </Button>
          <Button
            startIcon={<SwapHorizIcon />}
            variant="outlined"
            onClick={() => setMoveDialogOpen(true)}
            disabled={selectedIds.length === 0}
          >
            Verplaats ({selectedIds.length})
          </Button>
          <Button
            startIcon={<AddCircleIcon />}
            variant="outlined"
            onClick={() => setDuplicateDialogOpen(true)}
            disabled={selectedIds.length === 0}
          >
            Extra Toevoegen ({selectedIds.length})
          </Button>
        </Box>

        {/* Participants Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: 'grey.100' }}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.length === participants.length && participants.length > 0}
                    indeterminate={selectedIds.length > 0 && selectedIds.length < participants.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell><strong>Naam</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Telefoon</strong></TableCell>
                <TableCell><strong>Training</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Aangemeld op</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      Nog geen deelnemers voor deze sessie
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                participants.map((participant) => (
                  <TableRow key={participant.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedIds.includes(participant.id)}
                        onChange={() => handleSelectOne(participant.id)}
                      />
                    </TableCell>
                    <TableCell>
                      {[participant.first_name, participant.middle_name, participant.last_name]
                        .filter(Boolean)
                        .join(' ')}
                    </TableCell>
                    <TableCell>{participant.email}</TableCell>
                    <TableCell>{participant.phone}</TableCell>
                    <TableCell>
                      {Array.isArray(participant.trainings) 
                        ? participant.trainings.join(', ')
                        : participant.trainings}
                    </TableCell>
                    <TableCell>
                      <Chip label={participant.status} size="small" />
                    </TableCell>
                    <TableCell>
                      {new Date(participant.created_at).toLocaleDateString('nl-NL')}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Move Dialog */}
      <Dialog open={moveDialogOpen} onClose={() => setMoveDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Verplaats Deelnemers</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Verplaats {selectedIds.length} geselecteerde deelnemer(s) naar een andere sessie.
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Kies Doelsessie</InputLabel>
            <Select
              value={targetSessionId}
              onChange={(e) => setTargetSessionId(e.target.value)}
              label="Kies Doelsessie"
            >
              {allSessions.map(s => (
                <MenuItem key={s.id} value={s.id}>
                  {s.training_type} - {new Date(s.session_date).toLocaleDateString('nl-NL')} - {s.location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMoveDialogOpen(false)}>Annuleren</Button>
          <Button onClick={handleMoveParticipants} variant="contained" disabled={!targetSessionId}>
            Verplaatsen
          </Button>
        </DialogActions>
      </Dialog>

      {/* Duplicate Dialog */}
      <Dialog open={duplicateDialogOpen} onClose={() => setDuplicateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Extra Sessie Toevoegen</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Voeg {selectedIds.length} geselecteerde deelnemer(s) toe aan een extra sessie (dupliceer inschrijving).
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Kies Extra Sessie</InputLabel>
            <Select
              value={targetSessionId}
              onChange={(e) => setTargetSessionId(e.target.value)}
              label="Kies Extra Sessie"
            >
              {allSessions.map(s => (
                <MenuItem key={s.id} value={s.id}>
                  {s.training_type} - {new Date(s.session_date).toLocaleDateString('nl-NL')} - {s.location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDuplicateDialogOpen(false)}>Annuleren</Button>
          <Button onClick={handleDuplicateParticipants} variant="contained" disabled={!targetSessionId}>
            Toevoegen
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Participant Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Nieuwe Deelnemer Toevoegen aan Sessie</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Training: <strong>{session?.training_type}</strong> | 
            Datum: <strong>{session && formatDate(session.session_date)}</strong> | 
            Locatie: <strong>{session?.location}</strong>
          </Alert>
          
          <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'primary.main' }}>
            👤 Persoonlijke Gegevens
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Voornaam *"
                value={newParticipant.firstName}
                onChange={(e) => setNewParticipant({...newParticipant, firstName: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Tussenvoegsel"
                value={newParticipant.middleName}
                onChange={(e) => setNewParticipant({...newParticipant, middleName: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Achternaam *"
                value={newParticipant.lastName}
                onChange={(e) => setNewParticipant({...newParticipant, lastName: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Geboortedatum *"
                type="date"
                value={newParticipant.birthDate}
                onChange={(e) => setNewParticipant({...newParticipant, birthDate: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Geboorteplaats *"
                value={newParticipant.birthPlace}
                onChange={(e) => setNewParticipant({...newParticipant, birthPlace: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="BSN *"
                value={newParticipant.bsn}
                onChange={(e) => setNewParticipant({...newParticipant, bsn: e.target.value})}
                helperText="9 cijfers"
              />
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 3, mb: 1, color: 'primary.main' }}>
            📧 Contact
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email *"
                type="email"
                value={newParticipant.email}
                onChange={(e) => setNewParticipant({...newParticipant, email: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Telefoon *"
                value={newParticipant.phone}
                onChange={(e) => setNewParticipant({...newParticipant, phone: e.target.value})}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 3, mb: 1, color: 'primary.main' }}>
            📍 Adres
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Straat *"
                value={newParticipant.street}
                onChange={(e) => setNewParticipant({...newParticipant, street: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Huisnummer *"
                value={newParticipant.houseNumber}
                onChange={(e) => setNewParticipant({...newParticipant, houseNumber: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Postcode *"
                value={newParticipant.postalCode}
                onChange={(e) => setNewParticipant({...newParticipant, postalCode: e.target.value})}
                placeholder="1234AB"
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Plaats *"
                value={newParticipant.city}
                onChange={(e) => setNewParticipant({...newParticipant, city: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Land</InputLabel>
                <Select
                  value={newParticipant.country}
                  onChange={(e) => setNewParticipant({...newParticipant, country: e.target.value})}
                  label="Land"
                >
                  <MenuItem value="Nederland">Nederland</MenuItem>
                  <MenuItem value="België">België</MenuItem>
                  <MenuItem value="Duitsland">Duitsland</MenuItem>
                  <MenuItem value="Anders">Anders</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 3, mb: 1, color: 'primary.main' }}>
            💬 Bericht
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Opmerkingen"
            value={newParticipant.message}
            onChange={(e) => setNewParticipant({...newParticipant, message: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Annuleren</Button>
          <Button 
            onClick={handleAddParticipant} 
            variant="contained"
            disabled={
              !newParticipant.firstName || 
              !newParticipant.lastName || 
              !newParticipant.email ||
              !newParticipant.birthDate ||
              !newParticipant.birthPlace ||
              !newParticipant.bsn ||
              !newParticipant.phone ||
              !newParticipant.street ||
              !newParticipant.houseNumber ||
              !newParticipant.postalCode ||
              !newParticipant.city
            }
          >
            Deelnemer Toevoegen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminSessionDetail;
