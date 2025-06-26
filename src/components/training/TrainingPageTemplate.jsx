import React from 'react';
import { Box, Typography, Container, Card, CardContent, Button, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../../utils/seo.jsx';
import { getAssetPath } from '../../utils/assetUtils';

/**
 * Herbruikbare template voor trainingspagina's
 * @param {Object} props - Component properties
 * @param {string} props.title - Titel van de training
 * @param {string} props.description - Korte beschrijving voor SEO
 * @param {string} props.keywords - SEO keywords
 * @param {string} props.imageUrl - Achtergrondafbeelding URL
 * @param {string} props.url - Volledige URL voor SEO
 * @param {string} props.trainingId - ID van de training voor contactformulier (bijv. 'voertuigtechniek')
 * @param {string} props.subtitle - Ondertitel voor de header
 * @param {Object} props.mainContent - Hoofdinhoud van de training (React element)
 * @param {Object} props.additionalContent - Extra inhoud van de training (React element)
 */
function TrainingPageTemplate({
  title,
  description,
  keywords,
  imageUrl,
  url,
  trainingId,
  subtitle,
  mainContent,
  additionalContent
}) {
  const navigate = useNavigate();

  // Functie om naar contactpagina te navigeren met voorgeselecteerde training
  const handleAanmelden = () => {
    // Gebruik localStorage om de geselecteerde training op te slaan
    localStorage.setItem('selectedTraining', trainingId);
    navigate('/contact');
  };

  return (
    <Box>
      <SEO 
        title={`${title} | Hofmans Automotive Academie`}
        description={description}
        keywords={keywords}
        image={getAssetPath('/assets/logo-hofmans.png')}
        url={url}
      />
      <Box sx={{ 
        background: `linear-gradient(135deg, rgba(26, 75, 140, 0.9), rgba(37, 99, 235, 0.85)), url(${getAssetPath(imageUrl)})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white', 
        padding: '80px 0 60px', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: `url(${imageUrl}) no-repeat center center/cover`, 
          opacity: 0.2, 
          zIndex: 0 
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h1" sx={{ 
            fontWeight: 800, 
            marginBottom: 3, 
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            textAlign: 'center'
          }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            lineHeight: 1.6, 
            marginBottom: 5,
            textAlign: 'center',
            opacity: 0.9
          }}>
            {subtitle}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card sx={{ 
              mb: 4, 
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden'
            }}>
              <CardContent sx={{ p: 4 }}>
                {mainContent}
              </CardContent>
            </Card>

            {additionalContent && (
              <Card sx={{ 
                borderRadius: 3,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden'
              }}>
                <CardContent sx={{ p: 4 }}>
                  {additionalContent}
                </CardContent>
              </Card>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
              mb: 4,
              position: 'sticky',
              top: 100
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                  Interesse in deze training?
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Meld u aan voor deze training en verbeter uw vaardigheden en kennis.
                </Typography>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large" 
                  fullWidth
                  onClick={handleAanmelden}
                  sx={{ 
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600
                  }}
                >
                  Aanmelden
                </Button>
              </CardContent>
            </Card>

            <Card sx={{ 
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
              bgcolor: 'primary.main',
              color: 'white'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                  Meer informatie nodig?
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Neem contact met ons op voor meer informatie over deze training.
                </Typography>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  size="large" 
                  component={Link} 
                  to="/contact" 
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Contact opnemen
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default TrainingPageTemplate;
