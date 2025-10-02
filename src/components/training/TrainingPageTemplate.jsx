import React from 'react';
import { Box, Typography, Container, Card, CardContent, Button, Grid, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../../utils/seo.jsx';
import { getAssetPath } from '../../utils/assetUtils';
import BackgroundIcons from '../decorative/BackgroundIcons';

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
  const theme = useTheme();

  // Functie om naar aanmeldpagina te navigeren met voorgeselecteerde training
  const handleAanmelden = () => {
    // Gebruik localStorage om de geselecteerde training op te slaan
    localStorage.setItem('selectedTraining', trainingId);
    navigate('/aanmelden');
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
        background: `linear-gradient(135deg, ${theme.palette.primary.dark}E6, ${theme.palette.tertiary.main}D9, ${theme.palette.secondary.main}CC), url(${getAssetPath(imageUrl)})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white', 
        padding: '100px 0 80px', 
        position: 'relative',
        overflow: 'hidden',
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
      }}>
        {/* Decoratieve elementen met de drie hoofdkleuren */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.4,
          background: `
            radial-gradient(circle at 10% 20%, ${theme.palette.primary.main}40 0%, transparent 20%),
            radial-gradient(circle at 90% 30%, ${theme.palette.secondary.main}40 0%, transparent 20%),
            radial-gradient(circle at 50% 80%, ${theme.palette.tertiary.main}40 0%, transparent 20%)
          `
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

      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {/* Decoratieve icoontjes op de achtergrond */}
        <BackgroundIcons opacity={0.07} count={4} zIndex={0} />
        <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card sx={{ 
              mb: 4, 
              borderRadius: 3,
              boxShadow: `0 10px 30px ${theme.palette.common.black}14`,
              overflow: 'hidden',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '5px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.tertiary.main}, ${theme.palette.secondary.main})`,
              }
            }}>
              <CardContent sx={{ p: 4 }}>
                {mainContent}
              </CardContent>
            </Card>

            {additionalContent && (
              <Card sx={{ 
                borderRadius: 3,
                boxShadow: `0 10px 30px ${theme.palette.common.black}14`,
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '5px',
                  background: `linear-gradient(90deg, ${theme.palette.tertiary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                }
              }}>
                <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                  {additionalContent}
                </CardContent>
              </Card>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              borderRadius: 3,
              boxShadow: `0 10px 30px ${theme.palette.common.black}14`,
              overflow: 'hidden',
              mb: 6,
              position: 'sticky',
              top: 100,
              background: `linear-gradient(135deg, white, white, ${theme.palette.secondary.light}15)`,
              border: `1px solid ${theme.palette.secondary.light}30`
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
                    fontWeight: 600,
                    bgcolor: theme.palette.secondary.main,
                    '&:hover': {
                      bgcolor: theme.palette.secondary.dark
                    }
                  }}
                >
                  Aanmelden
                </Button>
              </CardContent>
            </Card>

            <Card sx={{ 
              borderRadius: 3,
              boxShadow: `0 10px 30px ${theme.palette.common.black}14`,
              overflow: 'hidden',
              background: `linear-gradient(135deg, ${theme.palette.tertiary.main}, ${theme.palette.primary.main})`,
              color: 'white',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '150px',
                height: '150px',
                background: `radial-gradient(circle at bottom right, ${theme.palette.secondary.main}30, transparent 70%)`,
                zIndex: 0
              }
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
                    borderColor: `${theme.palette.common.white}80`,
                    '&:hover': {
                      borderColor: theme.palette.common.white,
                      bgcolor: `${theme.palette.common.white}1A`
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
    </Box>
  );
}

export default TrainingPageTemplate;
