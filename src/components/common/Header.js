import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthActions } from '../../recoil/state/authActions';
import '../../styles/components/common/Header.scss'; 

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuthActions();

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    logout();
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
