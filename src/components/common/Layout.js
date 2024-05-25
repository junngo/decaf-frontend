import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

function Layout({ children }) {
  const { authState } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        {authState.user && <Sidebar />}
        <main style={{ flexGrow: 1 }}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;