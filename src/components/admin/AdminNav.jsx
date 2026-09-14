'use client';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Container, Tabs, Tab, Button } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const NAV_ITEMS = [
  { label: 'Aanmeldingen', icon: <PeopleIcon />, path: '/admin/dashboard' },
  { label: 'Sessies & Planning', icon: <CalendarMonthIcon />, path: '/admin/sessions' },
  { label: 'Instellingen', icon: <SettingsIcon />, path: '/admin/settings' },
];

/**
 * Gedeelde navigatiebalk voor alle admin-pagina's:
 * tabs voor de secties, uitloggen rechts. Sticky onder de site-navbar.
 */
function AdminNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Sessie-detail valt onder de Sessies-tab
  const activeTab = NAV_ITEMS.findIndex((item) =>
    location?.pathname?.startsWith(item.path)
  );

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: { xs: 56, sm: 64 },
        mt: { xs: 7, sm: 8 },
        zIndex: (theme) => theme.zIndex.appBar - 1,
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Tabs
            value={activeTab === -1 ? false : activeTab}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {NAV_ITEMS.map((item) => (
              <Tab
                key={item.path}
                label={item.label}
                icon={item.icon}
                iconPosition="start"
                onClick={() => navigate(item.path)}
                sx={{ minHeight: 56, textTransform: 'none', fontWeight: 600 }}
              />
            ))}
          </Tabs>
          <Button
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            color="inherit"
            sx={{ whiteSpace: 'nowrap', ml: 2 }}
          >
            Uitloggen
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default AdminNav;
