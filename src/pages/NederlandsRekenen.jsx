import React from 'react';
import { Typography, Box, Grid, Card, CardHeader, CardContent } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrainingPageTemplate from '../components/training/TrainingPageTemplate';
import { getAssetPath } from '../utils/assetUtils';

// Gebruik de asset utility functie voor het afbeeldingspad
const nederlandsRekenenImg = getAssetPath('/assets/nedrlands-en-wiskunde-toetsing.jpg');

function NederlandsRekenen() {
  // Hoofdinhoud van de toetsing
  const mainContent = (
    <>
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
        Nederlands & Rekenen Examens
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Wanneer u via een EVC-procedure uw MBO-diploma wilt behalen, moet u voldoen aan de taal- en rekeneisen. 
        Bij Hofmans Automotive Academie verzorgen wij de complete organisatie en afname van deze verplichte examens.
      </Typography>
      
      <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>
        Hoe zijn de taalexamens opgebouwd?
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Voor zowel Nederlands als Engels worden dezelfde vaardigheden getoetst, verdeeld over vijf examenonderdelen:
      </Typography>
      <Box component="ul" sx={{ pl: 2, mb: 3 }}>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Lezen en Luisteren</strong> - Centraal afgenomen examens
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Schrijven</strong> - Afgenomen door onze instelling
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Spreken en Gesprekken voeren</strong> - Afgenomen door onze instelling
        </Typography>
      </Box>
      
      <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>
        Wat toetst het rekenexamen?
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        U maakt het rekenexamen volledig digitaal. Tijdens dit centraal examen worden uw vaardigheden getest op vier hoofdgebieden:
      </Typography>
      <Box component="ul" sx={{ pl: 2, mb: 3 }}>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Getallen</strong> - Werken met gehele getallen, breuken en decimalen
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Verhoudingen</strong> - Percentages, schaalverdeling en evenredigheid
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Meten en Meetkunde</strong> - Lengtes, oppervlaktes, inhouden en vormen
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Verbanden</strong> - Grafieken, tabellen en formules interpreteren
        </Typography>
      </Box>
      
      <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>
        Welke toetsen zijn verplicht voor uw niveau?
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>MBO niveau 2 en 3:</strong> Nederlands (niveau 2F) en Rekenen (niveau 2F)
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>MBO niveau 4:</strong> Nederlands (niveau 3F), Engels (A2 tot B1) en Rekenen (niveau 3F)
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>HBO:</strong> Er gelden geen verplichte taal- en rekentoetsen
        </Typography>
      </Box>
    </>
  );

  // Extra inhoud van de toetsing
  const additionalContent = (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 'none', bgcolor: 'transparent' }}>
            <CardHeader
              avatar={<AssignmentIcon sx={{ fontSize: 45, color: 'primary.main' }} />}
              title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Officieel Geaccrediteerd</Typography>}
              sx={{ paddingBottom: 0, paddingLeft: 0 }}
            />
            <CardContent sx={{ paddingLeft: 0 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                Als geaccrediteerd exameninstituut verzorgen wij alle vereiste taal- en rekenexamens die u nodig heeft voor uw MBO-diplomering via EVC.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 'none', bgcolor: 'transparent' }}>
            <CardHeader
              avatar={<AssignmentIcon sx={{ fontSize: 45, color: 'primary.main' }} />}
              title={<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Van A tot Z Geregeld</Typography>}
              sx={{ paddingBottom: 0, paddingLeft: 0 }}
            />
            <CardContent sx={{ paddingLeft: 0 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                Van de eerste aanmelding tot en met de uitslag: wij begeleiden u persoonlijk bij elke stap richting uw diploma.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  return (
    <TrainingPageTemplate
      title="Taal- en Rekentoetsen | Nederlands & Rekenen"
      description="Geaccrediteerde Nederlands, Engels en Rekenexamens voor MBO via EVC bij Hofmans Automotive Academie. Complete begeleiding van aanmelding tot diploma."
      keywords="Nederlands examen, Rekenen examen, EVC toetsing, MBO diploma halen, taalexamen, rekenexamen, Hofmans Automotive Academie"
      imageUrl={nederlandsRekenenImg}
      url="https://hofmansautomotiveacademie.nl/nederlands-rekenen"
      trainingId="nederlands-rekenen"
      subtitle="Haal uw MBO-diploma via EVC met onze geaccrediteerde taal- en rekenexamens. Voor MBO niveau 2, 3 en 4 verzorgen wij de volledige examenorganisatie en persoonlijke begeleiding."
      mainContent={mainContent}
      additionalContent={additionalContent}
      isToetsing={true}
    />
  );
}

export default NederlandsRekenen;
