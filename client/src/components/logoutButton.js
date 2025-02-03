import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = () => {
  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('token');
    // Redireciona para a página de login
    window.location.href = "/login";
  };

  return (
    <button onClick={handleLogout}>
      <FaSignOutAlt /> Sair
    </button>
  );
};

export default LogoutButton;