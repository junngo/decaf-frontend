import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiService from '../api/apiService'; // Import the API service
import '../styles/pages/SignUpPage.scss'; // Make sure to import the correct SCSS file

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
        const response = await apiService.signUp({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        
        console.log(response.data);
        navigate('/signin'); // Navigate to sign-in page after successful sign-up
      } catch (error) {
        console.error('There was an error registering the user', error.response);
        // Handle the errors here (e.g., show notification to the user)
      }
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
        <div className="sign-in-redirect">
          Already have an account? <Link to="/signin">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
