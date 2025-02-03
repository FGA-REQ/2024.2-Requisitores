import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import LogoutButton from './logoutButton';

const TopNavbar = ({ pageTitle }) => {
  return (
    <header className="top-navbar">
      <div>
        <img src="/hfab.png" alt="Logo" />
      </div>
      <span>GestFarma - {pageTitle}</span>
      <div className="top-navbar-actions">
        <button>
          <FaUserCircle /> Perfil
        </button>
        <LogoutButton />
      </div>
    </header>
  );
};

export default TopNavbar;