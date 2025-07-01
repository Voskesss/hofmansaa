import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem, IconButton, Drawer, List, ListItem, ListItemText, Divider, useTheme } from '@mui/material';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import { getAssetPath } from '../utils/assetUtils';

// Gebruik de asset utility functie voor het logo pad
const logo = getAssetPath('/assets/logo-hofmans.png');

function Navbar() {
  const theme = useTheme();
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
    <AppBar position="static" sx={{ 
        background: `${theme.palette.primary.dark}E6`, 
        backdropFilter: 'blur(10px)', 
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', 
        borderBottom: `1px solid ${theme.palette.common.white}33` 
      }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: { xs: '0 16px', md: '0 50px' } }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Hofmans Automotive Logo" style={{ height: '40px', marginRight: '8px' }} />
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>
              Hofmans Automotive
            </Typography>
          </Box>
        </Link>
        {/* Desktop menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          <Button color="primary" component={Link} to="/" sx={{ fontWeight: 'bold', color: theme.palette.common.white, '&:hover': { backgroundColor: `${theme.palette.common.white}1A` } }}>
            Home
          </Button>
          <Box>
            <Button 
              color="primary" 
              onClick={handleClick} 
              sx={{ fontWeight: 'bold', color: theme.palette.common.white, '&:hover': { backgroundColor: `${theme.palette.common.white}1A` } }}
              endIcon={<ArrowDropDownIcon />}
            >
              Trainingen
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{ '& .MuiPaper-root': { backgroundColor: `${theme.palette.primary.dark}F2`, color: theme.palette.common.white, borderRadius: 2 } }}
            >
              <MenuItem onClick={handleClose} component={Link} to="/trainingen" sx={{ '&:hover': { backgroundColor: `${theme.palette.common.white}1A` } }}>
                Alle Trainingen
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/voertuigtechniek" sx={{ '&:hover': { backgroundColor: `${theme.palette.common.white}1A` } }}>
                Voertuigtechniek
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/llo" sx={{ '&:hover': { backgroundColor: `${theme.palette.common.white}1A` } }}>
                Leven Lang Ontwikkelen (LLO)
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/nederlands-rekenen" sx={{ '&:hover': { backgroundColor: `${theme.palette.common.white}1A` } }}>
                Nederlands & Rekenen
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/niet-technisch" sx={{ '&:hover': { backgroundColor: `${theme.palette.common.white}1A` } }}>
                Niet-Technisch Personeel
              </MenuItem>
            </Menu>
          </Box>
          <Button color="primary" component={Link} to="/contact" sx={{ fontWeight: 'bold', color: theme.palette.common.white, '&:hover': { backgroundColor: `${theme.palette.common.white}1A` } }}>
            Contact
          </Button>
          <Button 
            color="secondary" 
            component={Link}
            to="/student-portal"
            startIcon={<LoginIcon />}
            sx={{ 
              fontWeight: 'bold', 
              backgroundColor: `${theme.palette.common.white}26`, 
              color: theme.palette.common.white, 
              '&:hover': { 
                backgroundColor: `${theme.palette.common.white}40` 
              },
              borderRadius: '20px',
              padding: '6px 16px'
            }}
          >
            Studentenportal Inloggen
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
              backgroundColor: `${theme.palette.primary.dark}F2`, 
              color: theme.palette.common.white 
            },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2 }}>
            <img src={logo} alt="Hofmans Automotive Logo" style={{ height: '40px', marginBottom: '10px' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Hofmans Automotive
            </Typography>
            <Divider sx={{ backgroundColor: `${theme.palette.common.white}33`, mb: 2 }} />
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
              <Divider sx={{ backgroundColor: `${theme.palette.common.white}33`, my: 1 }} />
              <ListItem 
                button 
                component="a" 
                href="https://portal.hofmansautomotiveacademie.nl" 
                target="_blank"
                sx={{ 
                  backgroundColor: `${theme.palette.secondary.main}`,
                  borderRadius: 1,
                  my: 1
                }}
              >
                <ListItemText 
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LoginIcon sx={{ mr: 1, fontSize: '0.9rem' }} />
                      <Typography>Portal Inloggen</Typography>
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
