import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaChartBar, FaBox, FaClipboardList, FaUsers } from "react-icons/fa";
import { GiRemedy } from "react-icons/gi";
import { fetchUsuarioLogado } from '../utils/loginUtils';
import '../pages/layoutBase.css';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    fetchUsuarioLogado(setUsuarioLogado);
  }, []);

  const renderMenuItems = () => {
    if (!usuarioLogado) return null;

    const { Perfil } = usuarioLogado;

    const commonItems = [
      { path: '/dashboard', label: 'Dashboard', icon: <FaChartBar /> },
      { path: '/dispensacao', label: 'Dispensação', icon: <GiRemedy /> },
    ];

    const adminItems = [
      ...commonItems,
      { path: '/estoque', label: 'Estoque', icon: <FaBox /> },
      { path: '/relatorios', label: 'Relatórios', icon: <FaClipboardList /> },
      { path: '/usuarios', label: 'Usuários', icon: <FaUsers /> },
    ];

    const farmaceuticoItems = [
      ...commonItems,
      { path: '/estoque', label: 'Estoque', icon: <FaBox /> },
      { path: '/relatorios', label: 'Relatórios', icon: <FaClipboardList /> },
    ];

    const tecnicoItems = [
      ...commonItems,
      { path: '/relatorios', label: 'Relatórios', icon: <FaClipboardList /> },
    ];

    const auditorItems = [
      ...commonItems,
      { path: '/estoque', label: 'Estoque', icon: <FaBox /> },
      { path: '/relatorios', label: 'Relatórios', icon: <FaClipboardList /> },
      { path: '/usuarios', label: 'Usuários', icon: <FaUsers /> },
    ];

    switch (Perfil) {
      case 'Administrador':
        return adminItems.map(item => (
          <li key={item.path} className={location.pathname === item.path ? "active" : ""}>
            <Link to={item.path}>{item.icon} <span>{item.label}</span></Link>
          </li>
        ));
      case 'Farmacêutico':
        return farmaceuticoItems.map(item => (
          <li key={item.path} className={location.pathname === item.path ? "active" : ""}>
            <Link to={item.path}>{item.icon} <span>{item.label}</span></Link>
          </li>
        ));
      case 'Técnico de Farmácia':
        return tecnicoItems.map(item => (
          <li key={item.path} className={location.pathname === item.path ? "active" : ""}>
            <Link to={item.path}>{item.icon} <span>{item.label}</span></Link>
          </li>
        ));
      case 'Auditor':
        return auditorItems.map(item => (
          <li key={item.path} className={location.pathname === item.path ? "active" : ""}>
            <Link to={item.path}>{item.icon} <span>{item.label}</span></Link>
          </li>
        ));
      default:
        return null;
    }
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <button onClick={toggleSidebar} className="sidebar-toggle">
          <FaBars /> <span>Menu</span>
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {renderMenuItems()}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
