import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Alert, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';
import { useAuth } from '../contexts/AuthContext';

function SignIn() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    keepLoggedIn: false
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
    });
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser(loginData);
      login(data.user, { refresh: data.refresh, access: data.access }, loginData.keepLoggedIn);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError("Failed to login. Please check your credentials and try again.");
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" sx={{ mt: 8, mb: 3 }}>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              autoComplete="email"
              name="username"
              required
              fullWidth
              id="username"
              label="Email or Username"
              autoFocus
              value={loginData.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={loginData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={loginData.keepLoggedIn} onChange={handleChange} name="keepLoggedIn" color="primary" />}
              label="Keep me logged in"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              color="primary"
              onClick={handleSignUp}
              sx={{ mt: 1 }}
            >
              Don't have an account? Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SignIn;
