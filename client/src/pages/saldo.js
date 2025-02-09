import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaUserCircle, FaBars, FaChartLine, FaBox, FaArrowDown,FaArrowUp, FaArrowLeft} from "react-icons/fa";
import './layoutBase.css';
import './saldo.css';

const Saldo = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState(null);

  // Simulação de um estoque com produtos e quantidades
  const estoque = [
    { nome: 'Remédio A', quantidade: 10 },
    { nome: 'Remédio B', quantidade: 5 },
    { nome: 'Remédio C', quantidade: 20 },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    localStorage.setItem("sidebarState", isSidebarOpen ? "closed" : "open");
  };

  const handleFiltrar = () => {
    const produtoEncontrado = estoque.find(p => p.nome === produtoSelecionado);
    setQuantidade(produtoEncontrado ? produtoEncontrado.quantidade : null);
  };

  const pageTitles = {
    "/estoque": "Estoque",
    "/saldo": "Saldo",
    "/entradas": "Entradas",
    "/saidas": "Saídas",
  };

  return (
    <div className="layout-container">
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
        </nav>

        {/* Botão "Voltar para o Menu" */}
                        <div className="sidebar-footer">
                          <Link to="/dashboard" className="btn-voltar">
                            <FaArrowLeft /> <span>Voltar para o Menu</span>
                          </Link>
                        </div>
                      </aside>
   

      <div className="main-content">
        <header className="top-navbar">
          <div>
            <img src="/hfab.png" alt="Logo" />
          </div>
          <span>GestFarma - {pageTitles[location.pathname] || "Página"}</span>
          <div className="top-navbar-actions">
            <button><FaUserCircle /> Perfil</button>
            <button><FaSignOutAlt /> Sair</button>
          </div>
        </header>

        <main className="page-content">
          {children}

          {/* Seleção de Produto */}
          <div className="produto-container">
            <select 
              value={produtoSelecionado} 
              onChange={(e) => setProdutoSelecionado(e.target.value)} 
              className="select-item"
            >
              <option value="">Selecionar um Produto</option>
              {estoque.map((p, index) => (
                <option key={index} value={p.nome}>{p.nome}</option>
              ))}
            </select>
            <button onClick={handleFiltrar} className="btn-filtrar">FILTRAR</button>
          </div>

          {/* Tabela de Saldo */}
          {quantidade !== null && (
            <table className="tabela-saldo">
              <thead>
                <tr>
                  <th>NOME</th>
                  <th>QUANTIDADE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{produtoSelecionado}</td>
                  <td>{quantidade}</td>
                </tr>
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
};

export default Saldo;
