import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import logo from '../../public/assets/logo-hofmans.png';

function Footer() {
  return (
    <Box sx={{ backgroundColor: 'rgba(30, 58, 138, 0.9)', backdropFilter: 'blur(10px)', padding: '40px 50px', marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: { xs: 2, md: 0 } }}>
          <img src={logo} alt="Hofmans Automotive Logo" style={{ height: '40px', marginRight: '8px' }} />
          <CarRepairIcon sx={{ fontSize: 32, marginRight: 1, color: '#1e3a8a' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
            Hofmans Automotive Academie
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: { xs: 'center', md: 'right' }, color: '#ffffff' }}>
            &copy; {new Date().getFullYear()} Hofmans Automotive Academie. Alle rechten voorbehouden.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: { xs: 'center', md: 'right' }, marginTop: 1, color: '#ffffff' }}>
            KVK-nummer: 97469785
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, marginTop: 1 }}>
            <Link href="mailto:support@hofmansautomotiveacademie.nl" sx={{ color: '#ffffff', textDecoration: 'none', marginLeft: 2, '&:hover': { textDecoration: 'underline' } }}>
              Contact
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
