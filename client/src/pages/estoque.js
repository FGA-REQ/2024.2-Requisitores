import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChartBar, FaBox, FaClipboardList, FaUsers, FaSignOutAlt, FaUserCircle, FaBars } from "react-icons/fa";
import { GiRemedy } from "react-icons/gi";
import './layoutBase.css'; // Importando o layout base
import './estoque.css'; // Importando o CSS do estoque


const Estoque = ({ children }) => {
  const location = useLocation(); // Obtém a URL atual
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Efeito para buscar o estado salvo no localStorage ao carregar a página
  useEffect(() => {
    const storedSidebarState = localStorage.getItem("sidebarState");
    if (storedSidebarState !== null) {
      setIsSidebarOpen(storedSidebarState === "open");
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem("sidebarState", newState ? "open" : "closed"); // Salva no localStorage
  };

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/dispensacao": "Dispensação",
    "/estoque": "Estoque",
    "/relatorios": "Relatórios",
    "/usuarios": "Usuários"
  };

  return (
    <div className="layout-container">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <header className="top-navbar">
          <div>
            <img src="/hfab.png" alt="Logo" />
          </div>
          <span>GestFarma - {pageTitles[location.pathname] || "Página"}</span>
          <div className="top-navbar-actions">
            <button>
              <FaUserCircle /> Perfil
            </button>
            <button>
              <FaSignOutAlt /> Sair
            </button>
          </div>
        </header>

        {/* Conteúdo específico da página */}
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Estoque;