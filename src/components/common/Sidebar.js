import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { authState, logout } = useAuth();

  if (!authState.user) {
    return null;  // Do not render the sidebar if the user is not logged in
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={true}
      sx={{
        width: 240,  // Set the width of the sidebar
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          zIndex: 5,  // Ensure sidebar is behind the AppBar
          top: '64px'  // Offset by the height of the AppBar if AppBar is `fixed`
        }
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard">
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/settings">
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
