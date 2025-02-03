import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaChartBar, FaBox, FaClipboardList, FaUsers } from "react-icons/fa";
import { GiRemedy } from "react-icons/gi";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <button onClick={toggleSidebar} className="sidebar-toggle">
          <FaBars /> <span>Menu</span>
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard">
              <FaChartBar /> <span>Dashboard</span>
            </Link>
          </li>
          <li className={location.pathname === "/dispensacao" ? "active" : ""}>
            <Link to="/dispensacao">
              <GiRemedy /> <span>Dispensação</span>
            </Link>
          </li>
          <li className={location.pathname === "/estoque" ? "active" : ""}>
            <Link to="/estoque">
              <FaBox /> <span>Estoque</span>
            </Link>
          </li>
          <li className={location.pathname === "/relatorios" ? "active" : ""}>
            <Link to="/relatorios">
              <FaClipboardList /> <span>Relatórios</span>
            </Link>
          </li>
          <li className={location.pathname === "/usuarios" ? "active" : ""}>
            <Link to="/usuarios">
              <FaUsers /> <span>Usuários</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
