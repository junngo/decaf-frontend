import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
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
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {/* More items can be added here */}
        <ListItem button onClick={logout}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
