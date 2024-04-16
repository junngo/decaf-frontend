import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiService from '../api/apiService';
import '../styles/pages/SignInPage.scss';

const SignInPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing errors
    try {
      const response = await apiService.signIn(credentials);
      console.log(response);
      localStorage.setItem('token', response.data.jwt);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to login. Please check your credentials and try again.');
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="signin-form">
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </label>
        {error && <div className="error">{error}</div>}
        <button type="submit">Sign In</button>
        <div className="signup-redirect">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
