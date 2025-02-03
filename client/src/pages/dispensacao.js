import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Sidebar from '../components/sidebar';
import TopNavbar from '../components/topNavbar';
import { pageTitles, getStoredSidebarState, toggleSidebarState } from '../utils/pageUtils';
import './layoutBase.css';
import './dispensacao.css';

const Dispensacao = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  // Efeito para buscar o estado salvo no localStorage ao carregar a página
  useEffect(() => {
    setIsSidebarOpen(getStoredSidebarState());
  }, []);

  const toggleSidebar = () => {
    const newState = toggleSidebarState(isSidebarOpen);
    setIsSidebarOpen(newState);
  };

  return (
    <div className="layout-container">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <TopNavbar pageTitle={pageTitles[location.pathname] || "Página"} />
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dispensacao;