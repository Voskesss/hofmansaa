import React from 'react';
import { Box, Typography, Link, Button, Card, CardContent } from '@mui/material';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import LoginIcon from '@mui/icons-material/Login';
import { getAssetPath } from '../utils/assetUtils';

// Gebruik de asset utility functie voor het logo pad
const logo = getAssetPath('/assets/logo-hofmans.png');

function Footer() {
  return (
    <Box sx={{ backgroundColor: 'rgba(30, 58, 138, 0.9)', backdropFilter: 'blur(10px)', padding: '40px 50px', marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', md: 'flex-start' }, maxWidth: '1200px', margin: '0 auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: { xs: 2, md: 0 } }}>
          <img src={logo} alt="Hofmans Automotive Logo" style={{ height: '40px', marginRight: '8px' }} />
          <CarRepairIcon sx={{ fontSize: 32, marginRight: 1, color: '#1e3a8a' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
            Hofmans Automotive Academie
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: { xs: 4, md: 6 } }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: { xs: 'center', md: 'left' }, color: '#ffffff' }}>
              &copy; {new Date().getFullYear()} Hofmans Automotive Academie. Alle rechten voorbehouden.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: { xs: 'center', md: 'left' }, marginTop: 1, color: '#ffffff' }}>
              KVK-nummer: 97469785
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, marginTop: 1 }}>
              <Link href="mailto:support@hofmansautomotiveacademie.nl" sx={{ color: '#ffffff', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Contact
              </Link>
            </Box>
          </Box>
          
          {/* Portal inlogwidget */}
          <Card sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(10px)', 
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            minWidth: { xs: '100%', sm: '300px' },
            maxWidth: { xs: '100%', sm: '300px' }
          }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 1, fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <LoginIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                Studentenportaal
              </Typography>
              <Typography variant="body2" sx={{ color: '#ffffff', mb: 2, fontSize: '0.85rem' }}>
                Log in op het studentenportaal om toegang te krijgen tot je leermateriaal en voortgang.
              </Typography>
              <Button 
                variant="contained" 
                color="secondary"
                fullWidth
                href="https://portal.hofmansautomotiveacademie.nl"
                target="_blank"
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
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
