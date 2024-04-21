import React from 'react';
import '../../styles/components/common/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        © {new Date().getFullYear()} My Application
      </div>
    </footer>
  );
};

export default Footer;
