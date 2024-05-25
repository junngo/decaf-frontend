import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


function Header() {
    const { authState, logout } = useAuth();
    const navigate = useNavigate(); // Create navigate function for redirection

    const handleSignIn = () => {
        navigate('/signin'); // Navigation to Sign In page
    };

    const handleSignUp = () => {
        navigate('/signup'); // Navigation to Sign Up page
    };

    const handleLogout = async () => {
        await logout();
        navigate('/'); // Redirect to homepage or another appropriate page
    };

    return (
        <AppBar position="static" color="transparent" elevation={0}
            sx={{
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,  // Ensure this is higher than Sidebar's zIndex
                borderBottom: '1px solid #e0e0e0',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', margin: '0 auto', maxWidth: 1200, width: '100%', padding: '0 16px' }}>
            <Typography variant="h6" component="div" sx={{ textAlign: 'center' }} color="textPrimary">
                My App
            </Typography>
            <div>
                { authState.user ? (
                    <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>Logout</Button>
                ) : (
                    <>
                        <Button color="inherit" onClick={handleSignIn} sx={{ ml: 2 }}>Sign In</Button>
                        <Button variant="contained" color="primary" onClick={handleSignUp} sx={{ ml: 2 }}>Sign Up</Button>
                    </>
                )}
            </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
