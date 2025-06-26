import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import { getAssetPath } from '../utils/assetUtils';

// Gebruik de asset utility functie voor het logo pad
const logo = getAssetPath('/assets/logo-hofmans.png');

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
        {/* Desktop menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
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
                Leven Lang Ontwikkelen (LLO)
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/nederlands-rekenen" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                Nederlands & Rekenen
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/niet-technisch" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                Niet-Technisch Personeel
              </MenuItem>
            </Menu>
          </Box>
          <Button color="primary" component={Link} to="/contact" sx={{ fontWeight: 'bold', color: '#ffffff', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
            Contact
          </Button>
          <Button 
            color="secondary" 
            href="https://portal.hofmansautomotiveacademie.nl" 
            target="_blank"
            startIcon={<LoginIcon />}
            sx={{ 
              fontWeight: 'bold', 
              backgroundColor: 'rgba(255, 255, 255, 0.15)', 
              color: '#ffffff', 
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 0.25)' 
              },
              borderRadius: '20px',
              padding: '6px 16px'
            }}
          >
            Portal Inloggen
          </Button>
        </Box>
        {/* Mobile menu button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240, 
              backgroundColor: 'rgba(30, 58, 138, 0.95)', 
              color: '#ffffff' 
            },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2 }}>
            <img src={logo} alt="Hofmans Automotive Logo" style={{ height: '40px', marginBottom: '10px' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Hofmans Automotive
            </Typography>
            <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', mb: 2 }} />
            <List>
              <ListItem button component={Link} to="/">
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button component={Link} to="/trainingen">
                <ListItemText primary="Alle Trainingen" />
              </ListItem>
              <ListItem button component={Link} to="/voertuigtechniek">
                <ListItemText primary="Voertuigtechniek" />
              </ListItem>
              <ListItem button component={Link} to="/llo">
                <ListItemText primary="Leven Lang Ontwikkelen (LLO)" />
              </ListItem>
              <ListItem button component={Link} to="/nederlands-rekenen">
                <ListItemText primary="Nederlands & Rekenen" />
              </ListItem>
              <ListItem button component={Link} to="/niet-technisch">
                <ListItemText primary="Niet-Technisch Personeel" />
              </ListItem>
              <ListItem button component={Link} to="/contact">
                <ListItemText primary="Contact" />
              </ListItem>
              <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', my: 1 }} />
              <ListItem 
                button 
                component="a" 
                href="https://portal.hofmansautomotiveacademie.nl" 
                target="_blank"
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: 1,
                  my: 1
                }}
              >
                <ListItemText 
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LoginIcon sx={{ mr: 1, fontSize: '0.9rem' }} />
                      <Typography>Studentenportal Inloggen</Typography>
                    </Box>
                  } 
                />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
