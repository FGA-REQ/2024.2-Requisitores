import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaArrowDown, FaChartLine, FaArrowUp, FaBox, FaUserCircle, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import './layoutBase.css';
import './estoque.css';

const Estoque = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [produto, setProduto] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const storedState = localStorage.getItem("sidebarState");
    setIsSidebarOpen(storedState === "open");
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem("sidebarState", newState ? "open" : "closed");
  };

  const handleCadastrar = () => {
    if (produto.trim() !== "") {
      setProdutos([...produtos, produto]);
      setProduto("");
    }
  };

  const handleDeletar = (index) => {
    setProdutos(produtos.filter((_, i) => i !== index));
  };

  const pageTitles = {
    "/estoque": "Estoque",
    "/produto": "Produto",
    "/saldo": "Estoque",
    "/entradas": "Entradas",
    "/saidas": "Saídas",
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
            <li className={location.pathname === "/estoque" ? "active" : ""}>
              <Link to="/estoque">
                <FaBox /> <span>Estoque</span>
              </Link>
            </li>
            <li className={location.pathname === "/saldo" ? "active" : ""}>
              <Link to="/saldo">
                <FaChartLine /> <span>Saldo</span>
              </Link>
            </li>
            <li className={location.pathname === "/entradas" ? "active" : ""}>
              <Link to="/entradas">
                <FaArrowDown /> <span>Entradas</span>
              </Link>
            </li>
            <li className={location.pathname === "/saidas" ? "active" : ""}>
              <Link to="/saidas">
                <FaArrowUp /> <span>Saídas</span>
              </Link>
            </li>
          </ul>
          
          {/* Botão "Voltar para o Menu"  */}
          <div className="sidebar-footer">
            <Link to="/dashboard" className="btn-voltar">
              <FaArrowLeft /> <span>Voltar para o Menu</span>
            </Link>
          </div>
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

        <main className="page-content">
          {children}

          {/* Seção de Cadastro de Produtos */}
          <div className="produto-container">
            <input
              type="text"
              placeholder="Nome do Produto"
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
              className="input-produto"
            />
            <button onClick={handleCadastrar} className="btn-cadastrar">CADASTRAR</button>
          </div>

          {/* Lista de Produtos Cadastrados */}
          <div className="lista-produtos">
            <h3>NOME</h3>
            {produtos.map((item, index) => (
              <div key={index} className="produto-item">
                <span>{item}</span>
                <button onClick={() => handleDeletar(index)} className="btn-deletar">DELETAR</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Estoque;
