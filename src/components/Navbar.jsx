import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem } from '@mui/material';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import logo from '../../public/assets/logo-hofmans.png';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ background: 'rgba(30, 58, 138, 0.9)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: { xs: '0 16px', md: '0 50px' } }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Hofmans Automotive Logo" style={{ height: '40px', marginRight: '8px' }} />
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
              Hofmans Automotive
            </Typography>
          </Box>
        </Link>
        <Box sx={{ display: 'flex', gap: { xs: 1, md: 3 } }}>
          <Button color="primary" component={Link} to="/" sx={{ fontWeight: 'bold', color: '#ffffff', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
            Home
          </Button>
          <Box>
            <Button 
              color="primary" 
              onClick={handleClick} 
              sx={{ fontWeight: 'bold', color: '#ffffff', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
              endIcon={<ArrowDropDownIcon />}
            >
              Trainingen
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{ '& .MuiPaper-root': { backgroundColor: 'rgba(30, 58, 138, 0.95)', color: '#ffffff', borderRadius: 2 } }}
            >
              <MenuItem onClick={handleClose} component={Link} to="/trainingen" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                Alle Trainingen
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/voertuigtechniek" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                Voertuigtechniek
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/llo" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                LLO & APK Keuzedeel
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/nederlands-rekenen" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                Nederlands & Rekenen
              </MenuItem>
            </Menu>
          </Box>
          <Button color="primary" component={Link} to="/contact" sx={{ fontWeight: 'bold', color: '#ffffff', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
            Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
