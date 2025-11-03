// src/components/layout/Navbar.jsx
import React, { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  useTheme, // This hook gets the theme from the ThemeProvider
  useMediaQuery,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  Analytics,
  CloudUpload,
  Assessment,
  ExitToApp,
  Business,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.jsx'; // Use .jsx if you renamed it

// --- Menu items for dealer_user ---
const MENU_ITEMS = [
  { text: 'New Analysis', path: '/new',     icon: Analytics },
  { text: 'Bulk Upload',  path: '/bulk',    icon: CloudUpload },
  { text: 'Results',      path: '/results', icon: Assessment }
];

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [userAnchor, setUserAnchor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // This hook now correctly receives the theme you provided in App.jsx
  const theme = useTheme(); 
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const isActive = (path) => location.pathname.startsWith(path);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const openUserMenu = (e) => setUserAnchor(e.currentTarget);
  const closeUserMenu = () => setUserAnchor(null);

  const drawer = (
    <Box sx={{ width: 280, height: '100%', background: theme.custom.surface }}>
      <Box sx={{ p: 3, background: theme.custom.gradientPrimary, color: '#fff' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>CITNOW Analytics</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
            {(user?.username || 'U').charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>{user?.username || 'User'}</Typography>
            <Chip label="Dealer User" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }}/>
          </Box>
        </Box>
      </Box>
      
      <List sx={{ p: 2 }}>
        {MENU_ITEMS.map(({ text, path, icon: Icon }) => (
          <ListItemButton key={path} component={RouterLink} to={path} selected={isActive(path)} onClick={toggleDrawer} sx={{ mb: 1, borderRadius: 2, '&.Mui-selected': { background: theme.custom.gradientPrimary, color: '#fff', '& .MuiListItemIcon-root': { color: '#fff' } } }}>
            <ListItemIcon sx={{ color: isActive(path) ? '#fff' : theme.custom.textSecondary }}><Icon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{ background: theme.custom.background, borderBottom: `1px solid ${theme.custom.border}`, zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: '70px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isMobile && <IconButton onClick={toggleDrawer} sx={{ color: theme.custom.textPrimary }}><MenuIcon /></IconButton>}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 32, height: 32, borderRadius: 2, background: theme.custom.gradientPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Business sx={{ fontSize: 18, color: '#fff' }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, background: theme.custom.gradientPrimary, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                CITNOW
              </Typography>
            </Box>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5, background: theme.custom.surface, borderRadius: 3, p: 0.5, border: `1px solid ${theme.custom.border}` }}>
              {MENU_ITEMS.map(({ text, path }) => (
                <Button key={path} component={RouterLink} to={path} sx={{ color: isActive(path) ? theme.custom.primary : theme.custom.textSecondary, background: isActive(path) ? '#fff' : 'transparent', fontWeight: 600 }}>
                  {text}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Chip label="Dealer User" size="small" sx={{ display: { xs: 'none', sm: 'flex' }, background: `${theme.custom.success}15`, color: theme.custom.success, fontWeight: 700 }}/>
            <Tooltip title="Account">
              <IconButton onClick={openUserMenu}>
                <Avatar sx={{ width: 36, height: 36, background: theme.custom.gradientPrimary }}>
                  {(user?.username || 'U').charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={toggleDrawer} sx={{ '& .MuiDrawer-paper': { width: 280, border: 'none' } }}>
        {drawer}
      </Drawer>

      <Menu anchorEl={userAnchor} open={Boolean(userAnchor)} onClose={closeUserMenu}>
        <MenuItem disabled>
          <Typography variant="body2" fontWeight={600}>{user?.username || 'User'}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { closeUserMenu(); logout(); }} sx={{ color: theme.custom.error }}>
          <ListItemIcon><ExitToApp fontSize="small" sx={{ color: theme.custom.error }} /></ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Toolbar sx={{ minHeight: '70px !important' }} />
    </>
  );
}
