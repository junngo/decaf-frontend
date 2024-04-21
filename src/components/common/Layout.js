import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import '../../styles/components/common/Layout.scss';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideSidebarPaths = ['/signin', '/signup'];  // Paths where the sidebar should not be shown
  const showSidebar = !hideSidebarPaths.includes(location.pathname);

  return (
    <div className="layout">
      <Header />
      <div className="content-wrapper">
        {showSidebar && <Sidebar />}
        <main className="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
