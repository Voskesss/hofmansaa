import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardHeader, Divider } from '@mui/material';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { SEO } from '../utils/seo.jsx';

function Trainingen() {
  return (
    <Box>
      <Box sx={{ background: 'linear-gradient(to right, #1976d2, #42a5f5)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Onze Trainingen
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px', margin: '0 auto' }}>
            Bij Hofmans Automotive Academie bieden we een breed scala aan trainingen voor de automotive sector.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ padding: '60px 0' }}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)', borderRadius: 3 }}>
              <CardHeader
                avatar={<SchoolIcon sx={{ fontSize: 48, color: '#1976d2' }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold' }}>LLO (Leven Lang Ontwikkelen)</Typography>}
              />
              <CardContent>
                <Typography variant="body1" paragraph>
                  Onze LLO-programma's zijn gericht op een Leven Lang Ontwikkelen binnen de automotive sector. We bieden onder andere het keuzedeel APK aan, zodat u altijd up-to-date bent met de nieuwste technieken en regelgeving.
                </Typography>
                <Typography variant="body1" paragraph>
                  Deze programma's zijn geschikt voor zowel beginnende als ervaren professionals die hun kennis willen uitbreiden of een nieuwe richting willen inslaan binnen de autotechniek.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)', borderRadius: 3 }}>
              <CardHeader
                avatar={<CarRepairIcon sx={{ fontSize: 48, color: '#1976d2' }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold' }}>Trainingen Voertuigtechniek Werkplaats</Typography>}
              />
              <CardContent>
                <Typography variant="body1" paragraph>
                  Voor technisch personeel in de werkplaats bieden wij specialistische trainingen aan op het gebied van voertuigtechniek. Van diagnosetechnieken tot reparatie van complexe systemen, onze trainingen helpen u om voorop te blijven lopen in een snel veranderende sector.
                </Typography>
                <Typography variant="body1" paragraph>
                  Onze praktijkgerichte aanpak zorgt ervoor dat u de geleerde vaardigheden direct kunt toepassen in uw dagelijkse werk.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)', borderRadius: 3 }}>
              <CardHeader
                avatar={<PeopleIcon sx={{ fontSize: 48, color: '#1976d2' }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold' }}>Trainingen Niet-Technisch Personeel</Typography>}
              />
              <CardContent>
                <Typography variant="body1" paragraph>
                  Voor ondersteunend personeel zoals receptionisten en administratief medewerkers bieden wij trainingen aan die gericht zijn op communicatie, klantgerichtheid en andere essentiële vaardigheden.
                </Typography>
                <Typography variant="body1" paragraph>
                  Deze trainingen helpen u om effectiever te communiceren met klanten en collega's, en om uw rol binnen het bedrijf te optimaliseren.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)', borderRadius: 3 }}>
              <CardHeader
                avatar={<AssignmentIcon sx={{ fontSize: 48, color: '#1976d2' }} />}
                title={<Typography variant="h5" sx={{ fontWeight: 'bold' }}>Toetsing Nederlands en Rekenen</Typography>}
              />
              <CardContent>
                <Typography variant="body1" paragraph>
                  Het succesvol doorlopen van een EVC-traject (Erkenning van Verworven Competenties) vereist essentiële basisvaardigheden op het gebied van Nederlands en rekenen. Via HAMA kunt u oefenen en uw vaardigheden verbeteren met ons uitgebreide oefenmateriaal.
                </Typography>
                <Typography variant="body1" paragraph>
                  Wij bieden zowel training als toetsing aan, zodat u het vereiste niveau kunt aantonen en de volgende stap in uw carrière kunt zetten.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ margin: '40px 0' }} />

        <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 2 }}>
          Meld je aan voor onze trainingen
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 4, maxWidth: '800px', margin: '0 auto' }}>
          Wil je meer weten over een specifieke training of je direct aanmelden? Neem contact met ons op via het contactformulier.
        </Typography>
      </Container>
    </Box>
  );
}

export default Trainingen;
