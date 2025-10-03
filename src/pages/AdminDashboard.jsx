import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Chip, Button, Select, MenuItem, FormControl, InputLabel,
  Alert, CircularProgress, Card, CardContent, Grid, Checkbox, Collapse, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Switch
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import LinkIcon from '@mui/icons-material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import * as XLSX from 'xlsx';
import { SEO } from '../utils/seo.jsx';

function AdminDashboard() {
  const navigate = useNavigate();
  const [aanmeldingen, setAanmeldingen] = useState([]);
  const [stats, setStats] = useState({ total: 0, byStatus: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [allSessions, setAllSessions] = useState([]);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [duplicateMode, setDuplicateMode] = useState(false);
  const [trainingFilter, setTrainingFilter] = useState('all');
  const [filteredAanmeldingen, setFilteredAanmeldingen] = useState([]);

  useEffect(() => {
    // Check of admin ingelogd is
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchAanmeldingen();
    fetchAllSessions();
  }, [navigate]);

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
        setAllSessions(data.data);
      }
    } catch (err) {
      console.error('Error fetching sessions:', err);
    }
  };

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
      setFilteredAanmeldingen(data.data); // Initial filter

    } catch (err) {
      setError(err.message || 'Er is een fout opgetreden');
    } finally {
      setLoading(false);
    }
  };

  // Filter aanmeldingen when training filter changes
  useEffect(() => {
    if (trainingFilter === 'all') {
      setFilteredAanmeldingen(aanmeldingen);
    } else {
      setFilteredAanmeldingen(
        aanmeldingen.filter(item => 
          Array.isArray(item.trainings) 
            ? item.trainings.includes(trainingFilter)
            : item.trainings === trainingFilter
        )
      );
    }
  }, [trainingFilter, aanmeldingen]);

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

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(aanmeldingen.map(item => item.id));
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

  const handleExportToExcel = () => {
    const selectedAanmeldingen = aanmeldingen.filter(item => selectedIds.includes(item.id));
    
    if (selectedAanmeldingen.length === 0) {
      alert('Selecteer minimaal één aanmelding om te exporteren');
      return;
    }

    // Maak data voor Excel met sessie info
    const excelData = selectedAanmeldingen.map(item => {
      // Zoek sessie info als session_id bestaat
      const sessie = item.session_id 
        ? allSessions.find(s => s.id === item.session_id)
        : null;

      return {
        'ID': item.id,
        'Voornaam': item.first_name,
        'Tussenvoegsel': item.middle_name || '',
        'Achternaam': item.last_name,
        'Geboortedatum': formatBirthDate(item.birth_date),
        'Geboorteplaats': item.birth_place,
        'Email': item.email,
        'Telefoon': item.phone,
        'Straat': item.street,
        'Huisnummer': item.house_number,
        'Postcode': item.postal_code,
        'Plaats': item.city,
        'Land': item.country,
        'Organisatie': item.org_name || '',
        'Contactpersoon': item.contact_name || '',
        'Contact Email': item.contact_email || '',
        'Training(s)': Array.isArray(item.trainings) ? item.trainings.join(', ') : item.trainings,
        'Status': getStatusLabel(item.status),
        'Aangemeld op': formatDate(item.created_at),
        // Sessie planning (gevuld als gekoppeld)
        'Sessie Status': sessie ? 'Ingepland' : 'Nog niet ingepland',
        'Sessie Datum': sessie ? new Date(sessie.session_date).toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '',
        'Sessie Tijd': sessie ? `${sessie.start_time?.substring(0,5)} - ${sessie.end_time?.substring(0,5)}` : '',
        'Sessie Locatie': sessie ? sessie.location : '',
        'Sessie Training': sessie ? sessie.training_type : '',
        'Bericht': item.message || '',
        'Opmerkingen Planning': ''
      };
    });

    // Maak Excel workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Kolom breedtes instellen
    ws['!cols'] = [
      { wch: 5 },  // ID
      { wch: 15 }, // Voornaam
      { wch: 12 }, // Tussenvoegsel
      { wch: 15 }, // Achternaam
      { wch: 12 }, // Geboortedatum (dd-mm-jjjj)
      { wch: 15 }, // Geboorteplaats
      { wch: 25 }, // Email
      { wch: 15 }, // Telefoon
      { wch: 20 }, // Straat
      { wch: 10 }, // Huisnummer
      { wch: 10 }, // Postcode
      { wch: 15 }, // Plaats
      { wch: 12 }, // Land
      { wch: 20 }, // Organisatie
      { wch: 20 }, // Contactpersoon
      { wch: 25 }, // Contact Email
      { wch: 30 }, // Training(s)
      { wch: 15 }, // Status
      { wch: 18 }, // Aangemeld op
      { wch: 18 }, // Sessie Status
      { wch: 12 }, // Sessie Datum
      { wch: 15 }, // Sessie Tijd
      { wch: 20 }, // Sessie Locatie
      { wch: 15 }, // Sessie Training
      { wch: 30 }, // Bericht
      { wch: 30 }  // Opmerkingen Planning
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Aanmeldingen');

    // Download Excel file
    const filename = `aanmeldingen_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, filename);

    console.log(`✅ ${selectedAanmeldingen.length} aanmeldingen geëxporteerd naar ${filename}`);
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

  const formatBirthDate = (dateString) => {
    if (!dateString) return 'Niet opgegeven';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const toggleRowExpand = (id) => {
    setExpandedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleToggleSession = (sessionId) => {
    setSelectedSessions(prev =>
      prev.includes(sessionId)
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const handleDeleteRegistration = async (id, naam) => {
    if (!window.confirm(`Weet je zeker dat je de aanmelding van ${naam} wilt verwijderen?\n\nDit kan niet ongedaan worden gemaakt!`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/delete-registration?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fout bij verwijderen');
      }

      alert(data.message);
      fetchAanmeldingen();

    } catch (err) {
      alert(err.message);
    }
  };

  const handleLinkToSessions = async () => {
    if (selectedIds.length === 0 || selectedSessions.length === 0) {
      alert('Selecteer minimaal 1 aanmelding en 1 sessie');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/link-to-session', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          registrationIds: selectedIds,
          sessionIds: selectedSessions,
          duplicateForMultiple: duplicateMode
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fout bij koppelen');
      }

      alert(data.message);
      setLinkDialogOpen(false);
      setSelectedIds([]);
      setSelectedSessions([]);
      setDuplicateMode(false);
      fetchAanmeldingen();

    } catch (err) {
      alert(err.message);
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
        title="Admin Dashboard | Hofmans Automotive Academie"
        description="Admin dashboard voor beheer van aanmeldingen"
        noindex={true}
      />

      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4, mt: 8, mb: 4 }}>
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
                startIcon={<CalendarMonthIcon />}
                onClick={() => navigate('/admin/sessions')}
                sx={{ mr: 2, color: 'white', borderColor: 'white' }}
                variant="outlined"
              >
                Sessies
              </Button>
              <Button
                startIcon={<SettingsIcon />}
                onClick={() => navigate('/admin/settings')}
                sx={{ mr: 2, color: 'white', borderColor: 'white' }}
                variant="outlined"
              >
                Instellingen
              </Button>
              <Button
                startIcon={<LinkIcon />}
                onClick={() => setLinkDialogOpen(true)}
                disabled={selectedIds.length === 0}
                sx={{ mr: 2, color: 'white', borderColor: 'white' }}
                variant="outlined"
              >
                Koppel aan Sessie ({selectedIds.length})
              </Button>
              <Button
                startIcon={<FileDownloadIcon />}
                onClick={handleExportToExcel}
                disabled={selectedIds.length === 0}
                sx={{ mr: 2, color: 'white', borderColor: 'white' }}
                variant="outlined"
              >
                Export Excel ({selectedIds.length})
              </Button>
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

      <Container maxWidth="xl" sx={{ py: 3, pb: 8 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Filter */}
        <Box sx={{ mb: 3 }}>
          <FormControl sx={{ minWidth: 250 }}>
            <InputLabel>Filter op Training</InputLabel>
            <Select
              value={trainingFilter}
              onChange={(e) => setTrainingFilter(e.target.value)}
              label="Filter op Training"
            >
              <MenuItem value="all">Alle Trainingen ({aanmeldingen.length})</MenuItem>
              <MenuItem value="llo">LLO</MenuItem>
              <MenuItem value="voertuigtechniek">Voertuigtechniek</MenuItem>
              <MenuItem value="nederlands-rekenen">Nederlands & Rekenen</MenuItem>
              <MenuItem value="niet-technisch">Niet-technisch</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="caption" sx={{ ml: 2, color: 'text.secondary' }}>
            {trainingFilter !== 'all' && `${filteredAanmeldingen.length} resultaten`}
          </Typography>
        </Box>

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
                <TableCell />
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.length === aanmeldingen.length && aanmeldingen.length > 0}
                    indeterminate={selectedIds.length > 0 && selectedIds.length < aanmeldingen.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Naam</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Telefoon</strong></TableCell>
                <TableCell><strong>Training(s)</strong></TableCell>
                <TableCell><strong>Sessie</strong></TableCell>
                <TableCell><strong>Aangemeld op</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Acties</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAanmeldingen.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      Geen aanmeldingen gevonden
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAanmeldingen.map((item) => {
                  const isExpanded = expandedRows.includes(item.id);
                  return (
                    <React.Fragment key={item.id}>
                      <TableRow hover>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => toggleRowExpand(item.id)}
                          >
                            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </IconButton>
                        </TableCell>
                        <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleSelectOne(item.id)}
                      />
                    </TableCell>
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
                      {item.session_id ? (
                        <Chip label="Gepland" color="success" size="small" />
                      ) : (
                        <Chip label="Niet ingepland" color="warning" size="small" />
                      )}
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
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
                      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            Volledige Gegevens
                          </Typography>
                          <Grid container spacing={2}>
                            {item.session_id && (
                              <Grid item xs={12}>
                                <Alert severity="success">
                                  <Typography variant="subtitle2">Sessie Planning</Typography>
                                  <Typography><strong>Status:</strong> Deelnemer is ingepland voor een sessie</Typography>
                                  <Button 
                                    size="small" 
                                    onClick={() => navigate(`/admin/sessions/${item.session_id}`)}
                                    sx={{ mt: 1 }}
                                  >
                                    Bekijk Sessie Details →
                                  </Button>
                                </Alert>
                              </Grid>
                            )}
                            {!item.session_id && (
                              <Grid item xs={12}>
                                <Alert severity="warning">
                                  <Typography><strong>Niet ingepland:</strong> Deze deelnemer is nog niet gekoppeld aan een sessie</Typography>
                                </Alert>
                              </Grid>
                            )}
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2" color="text.secondary">Persoonlijke Gegevens</Typography>
                              <Typography><strong>Geboortedatum:</strong> {formatBirthDate(item.birth_date)}</Typography>
                              <Typography><strong>Geboorteplaats:</strong> {item.birth_place}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2" color="text.secondary">Adresgegevens</Typography>
                              <Typography><strong>Straat:</strong> {item.street} {item.house_number}</Typography>
                              <Typography><strong>Postcode:</strong> {item.postal_code}</Typography>
                              <Typography><strong>Plaats:</strong> {item.city}</Typography>
                              <Typography><strong>Land:</strong> {item.country}</Typography>
                            </Grid>
                            {(item.org_name || item.contact_name) && (
                              <Grid item xs={12} md={6}>
                                <Typography variant="subtitle2" color="text.secondary">Organisatie</Typography>
                                {item.org_name && <Typography><strong>Naam:</strong> {item.org_name}</Typography>}
                                {item.contact_name && <Typography><strong>Contactpersoon:</strong> {item.contact_name}</Typography>}
                                {item.contact_email && <Typography><strong>Contact Email:</strong> {item.contact_email}</Typography>}
                              </Grid>
                            )}
                            {item.message && (
                              <Grid item xs={12}>
                                <Typography variant="subtitle2" color="text.secondary">Bericht</Typography>
                                <Typography>{item.message}</Typography>
                              </Grid>
                            )}
                            <Grid item xs={12}>
                              <Button
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDeleteRegistration(
                                  item.id, 
                                  [item.first_name, item.middle_name, item.last_name].filter(Boolean).join(' ')
                                )}
                                sx={{ mt: 2 }}
                              >
                                Aanmelding Verwijderen
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Koppel aan Sessie Dialog */}
      <Dialog open={linkDialogOpen} onClose={() => setLinkDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Koppel Aanmeldingen aan Sessie(s)</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Koppel {selectedIds.length} geselecteerde aanmelding(en) aan één of meerdere sessies.
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={duplicateMode}
                onChange={(e) => setDuplicateMode(e.target.checked)}
                color="primary"
              />
            }
            label="Meerdere sessies mogelijk (dupliceer inschrijving)"
            sx={{ mb: 2, display: 'block' }}
          />

          <Typography variant="subtitle2" gutterBottom>
            Selecteer sessie(s):
          </Typography>

          <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
            {allSessions.length === 0 ? (
              <Typography color="text.secondary">Geen sessies beschikbaar</Typography>
            ) : (
              allSessions.map((session) => (
                <Paper key={session.id} sx={{ p: 2, mb: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedSessions.includes(session.id)}
                        onChange={() => handleToggleSession(session.id)}
                        disabled={!duplicateMode && selectedSessions.length >= 1 && !selectedSessions.includes(session.id)}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {session.training_type} - {new Date(session.session_date).toLocaleDateString('nl-NL', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {session.start_time?.substring(0,5)} - {session.end_time?.substring(0,5)} | {session.location} | {session.registered_count || 0}/{session.max_participants} deelnemers
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>
              ))
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLinkDialogOpen(false)}>Annuleren</Button>
          <Button 
            onClick={handleLinkToSessions} 
            variant="contained"
            disabled={selectedSessions.length === 0}
          >
            Koppelen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminDashboard;
