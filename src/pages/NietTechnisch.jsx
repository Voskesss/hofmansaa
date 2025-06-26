import React from 'react';
import { Typography, Box } from '@mui/material';
import TrainingPageTemplate from '../components/training/TrainingPageTemplate';

function NietTechnisch() {
  // Hoofdinhoud van de training
  const mainContent = (
    <>
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
        Over onze trainingen voor niet-technisch personeel
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Onze trainingen voor niet-technisch personeel zijn speciaal ontwikkeld voor medewerkers in ondersteunende en klantgerichte functies binnen de automotive sector. Deze trainingen richten zich op het verbeteren van klantcommunicatie, service-excellentie en specifieke kennis die nodig is om effectief te werken in een technische omgeving.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Of u nu werkzaam bent als service adviseur, receptionist(e), garantiespecialist of in een andere niet-technische functie, onze trainingen bieden u de tools en kennis om uw werk naar een hoger niveau te tillen.
      </Typography>
      <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>
        Wat leert u tijdens deze trainingen?
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Effectieve communicatie met klanten en technici
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Basiskennis van voertuigtechniek voor niet-technici
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Klachtenafhandeling en klanttevredenheid
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Werkplaatsplanning en efficiëntie
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Garantieprocessen en administratie
        </Typography>
      </Box>
    </>
  );

  // Extra inhoud van de training
  const additionalContent = (
    <>
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
        Voordelen van onze trainingen
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Onze trainingen worden gegeven door ervaren professionals uit de automotive sector die zowel de technische als de commerciële aspecten van het vak begrijpen. Dit zorgt voor een praktijkgerichte aanpak met direct toepasbare kennis.
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Praktijkgericht: direct toepasbaar in uw dagelijkse werkzaamheden
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Op maat: trainingen afgestemd op uw specifieke functie en behoeften
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Interactief: leren door te doen en ervaringen uit te wisselen
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          Professioneel: gegeven door ervaren trainers met kennis van de branche
        </Typography>
      </Box>
    </>
  );

  return (
    <TrainingPageTemplate
      title="Trainingen Niet-Technisch Personeel"
      description="Specialistische trainingen voor niet-technisch personeel in de automotive sector. Verbeter uw kennis en vaardigheden met onze professionele cursussen."
      keywords="niet-technisch personeel, automotive training, Hofmans Automotive Academie, service adviseur, receptie"
      imageUrl="/assets/voertuigtechniek.jpg"
      url="https://hofmansautomotiveacademie.nl/training/trainingen-autmotive-niet-technisch-personeel/"
      trainingId="niet-technisch"
      subtitle="Professionele trainingen voor service adviseurs, receptionisten en andere niet-technische functies in de automotive sector."
      mainContent={mainContent}
      additionalContent={additionalContent}
    />
  );
}

export default NietTechnisch;
