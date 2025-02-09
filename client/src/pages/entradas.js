import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaSignOutAlt, FaUserCircle, FaBars, FaArrowDown, 
  FaChartLine, FaArrowUp, FaBox, FaArrowLeft 
} from "react-icons/fa";
import './layoutBase.css'; // Layout base
import './saidas.css'; // Estilos do estoque

const Estoque = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [produtoSelecionado, setProdutoSelecionado] = useState(""); 
  const [quantidade, setQuantidade] = useState(""); 
  const [produtos, setProdutos] = useState([]); 

  useEffect(() => {
    const storedSidebarState = localStorage.getItem("sidebarState");
    if (storedSidebarState !== null) {
      setIsSidebarOpen(storedSidebarState === "open");
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem("sidebarState", newState ? "open" : "closed");
  };

  const handleSalvar = () => {
    if (produtoSelecionado && quantidade) {
      setProdutos([...produtos, { nome: produtoSelecionado, quantidade }]);
      setProdutoSelecionado("");
      setQuantidade("");
    }
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
        </nav>

        {/* Botão "Voltar para o Menu" */}
        <div className="sidebar-footer">
          <Link to="/dashboard" className="btn-voltar">
            <FaArrowLeft /> <span>Voltar para o Menu</span>
          </Link>
        </div>
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

        {/* Entrada de Saldo */}
        <div className="saldo-container">
          <div className="saldo-inputs">
            <select 
              className="select-produto" 
              value={produtoSelecionado} 
              onChange={(e) => setProdutoSelecionado(e.target.value)}
            >
              <option value="">Selecionar um item</option>
              <option value="Remédio A">Remédio A</option>
              <option value="Remédio B">Remédio B</option>
              <option value="Remédio C">Remédio C</option>
            </select>
            
            <input 
              type="number" 
              className="input-quantidade" 
              placeholder="Quantidade" 
              value={quantidade} 
              onChange={(e) => setQuantidade(e.target.value)} 
            />

            <button className="btn-salvar" onClick={handleSalvar}>
              SALVAR
            </button>
          </div>

          {/* Lista de produtos cadastrados */}
          <table className="tabela-saldo">
            <thead>
              <tr>
                <th>NOME</th>
                <th>QUANTIDADE</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto, index) => (
                <tr key={index}>
                  <td>{produto.nome}</td>
                  <td>{produto.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Estoque;
