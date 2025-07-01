import React from 'react';
import { Box, Typography, Button, Card, CardContent, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import LoginIcon from '@mui/icons-material/Login';
import { getAssetPath } from '../utils/assetUtils';

// Gebruik de asset utility functie voor het logo pad
const logo = getAssetPath('/assets/logo-hofmans.png');

function Footer() {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      backgroundColor: theme.palette.primary.dark, 
      backdropFilter: 'blur(10px)', 
      padding: '40px 50px', 
      marginTop: 'auto', 
      borderTop: `1px solid ${theme.palette.primary.light}` 
    }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', md: 'flex-start' }, maxWidth: '1200px', margin: '0 auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: { xs: 2, md: 0 } }}>
          <img src={logo} alt="Hofmans Automotive Logo" style={{ height: '40px', marginRight: '8px' }} />
          <CarRepairIcon sx={{ fontSize: 32, marginRight: 1, color: theme.palette.secondary.light }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>
            Hofmans Automotive Academie
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: { xs: 4, md: 6 } }}>
          <Box>
            <Typography variant="body2" sx={{ textAlign: { xs: 'center', md: 'left' }, color: theme.palette.common.white }}>
              &copy; {new Date().getFullYear()} Hofmans Automotive Academie. Alle rechten voorbehouden.
            </Typography>
            <Typography variant="body2" sx={{ textAlign: { xs: 'center', md: 'left' }, marginTop: 1, color: theme.palette.common.white }}>
              KVK-nummer: 97469785
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, marginTop: 1 }}>
              <Link href="mailto:support@hofmansautomotiveacademie.nl" sx={{ color: theme.palette.common.white, textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: theme.palette.secondary.light } }}>
                Contact
              </Link>
            </Box>
          </Box>
          
          {/* Portal inlogwidget */}
          <Card sx={{ 
            backgroundColor: `${theme.palette.primary.main}40`, 
            backdropFilter: 'blur(10px)', 
            borderRadius: 2,
            border: `1px solid ${theme.palette.primary.light}40`,
            minWidth: { xs: '100%', sm: '300px' },
            maxWidth: { xs: '100%', sm: '300px' }
          }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ color: theme.palette.common.white, mb: 1, fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <LoginIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                Studentenportaal
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.common.white, mb: 2, fontSize: '0.85rem' }}>
                Log in op het studentenportaal om toegang te krijgen tot je leermateriaal en voortgang.
              </Typography>
              <Button 
                variant="contained" 
                color="secondary"
                fullWidth
                component={RouterLink}
                to="/student-portal"
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 'bold',
                  backgroundColor: theme.palette.secondary.main,
                  '&:hover': { backgroundColor: theme.palette.secondary.dark }
                }}
              >
                Inloggen op Portal
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
