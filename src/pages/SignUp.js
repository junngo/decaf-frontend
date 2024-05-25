// src/pages/SignUp.js

import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';
import { useAuth } from '../contexts/AuthContext';

function SignUp() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });
    setError({
      ...error,
      [event.target.name]: ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError({ ...error, confirmPassword: ['Passwords do not match.'] });
      return;
    }
    
    try {
      const data = await registerUser(userData);
      login(data.user, { refresh: data.refresh, access: data.access });
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const normalizedErrors = Object.keys(error.response.data.errors).reduce((acc, key) => {
          // Ensure every error is an array
          acc[key] = Array.isArray(error.response.data.errors[key]) ? error.response.data.errors[key] : [error.response.data.errors[key]];
          return acc;
        }, {});
        setError(normalizedErrors);
      } else {
        setError({ general: ['Failed to register user.'] });
      }
    }
  };

  const handleSignInRedirect = () => {
    navigate('/signin'); // Programmatically navigate to SignIn page
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" sx={{ mt: 8, mb: 3 }}>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(error).map((key) => {
            const message = error[key];
            return (
              message.length > 0 && (
                <Grid item xs={12} key={key}>
                  <Alert severity="error">
                    {Array.isArray(message) ? message.join(', ') : message}
                  </Alert>
                </Grid>
              )
            );
          })}
          <Grid item xs={12}>
            <TextField
              autoComplete="username"
              name="username"
              required
              fullWidth
              id="username"
              label="Username"
              autoFocus
              value={userData.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="email"
              name="email"
              required
              fullWidth
              id="email"
              label="Email Address"
              value={userData.email}
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
              autoComplete="new-password"
              value={userData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={userData.confirmPassword}
              onChange={handleChange}
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
              Sign Up
            </Button>
            <Button
                color="primary"
                onClick={handleSignInRedirect}
                sx={{ textTransform: 'none' }} // Styling to make it look less like a button and more like a link
              >
                Already have an account? Sign in
              </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SignUp;
