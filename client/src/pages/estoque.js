import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importando useLocation
import { FaBars, FaArrowDown, FaChartLine, FaArrowUp, FaBox, FaUserCircle, FaSignOutAlt} from "react-icons/fa";
import './layoutBase.css'; // Importando o layout base
import './estoque.css'; // Importando o CSS do estoque

const Estoque = ({ children }) => {
  const location = useLocation(); // Obtém a URL atual
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [produto, setProduto] = useState(""); // Estado para armazenar o nome do produto digitado
  const [produtos, setProdutos] = useState([]); // Lista de produtos cadastrados

  // Função para obter o estado da sidebar do localStorage
  const getStoredSidebarState = () => {
    const storedState = localStorage.getItem("sidebarState");
    return storedState === "open";
  };

  // Função para alternar o estado da sidebar
  const toggleSidebarState = (currentState) => !currentState;

  // Efeito para buscar o estado salvo no localStorage ao carregar a página
  useEffect(() => {
    setIsSidebarOpen(getStoredSidebarState());
  }, []);

  const toggleSidebar = () => {
    const newState = toggleSidebarState(isSidebarOpen);
    setIsSidebarOpen(newState);
    localStorage.setItem("sidebarState", newState ? "open" : "closed"); // Salva no localStorage
  };

  const handleCadastrar = () => {
    if (produto.trim() !== "") {
      setProdutos([...produtos, produto]); // Adiciona o produto à lista
      setProduto(""); // Limpa o campo de entrada
    }
  };

  const handleDeletar = (index) => {
    const novaLista = produtos.filter((_, i) => i !== index);
    setProdutos(novaLista);
  };

  const pageTitles = {
    "/estoque": "Estoque",
    "/protudo": "Produto",
    "/saldo": "Estoque",
    "/entradas": "Entradas",
    "/saidas": "Saidas",
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