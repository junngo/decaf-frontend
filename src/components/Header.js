import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components/Header.scss'; 

const Header = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>My Application</h1>
        <nav>
          <ul>
            <li><Link to="/" className='nav-link'>Home</Link></li>
            {!isLoggedIn ? (
              <>
                <li><Link to="/signup" className="button-link">Sign Up</Link></li>
                <li><Link to="/signin" className="button-link">Sign In</Link></li>
              </>
            ) : (
              <li><button onClick={handleLogout} className='nav-link'>Logout</button></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
