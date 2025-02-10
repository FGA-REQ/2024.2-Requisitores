import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaSignOutAlt, FaUserCircle, FaBars, FaArrowDown, 
  FaChartLine, FaArrowUp, FaBox, FaArrowLeft 
} from "react-icons/fa";
import './layoutBase.css'; 
import './saidas.css'; 

const Entradas = ({ children }) => {
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
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5001/api/estoque", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }

      const data = await response.json();
      setProdutos(data.estoques);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleSalvar = async () => {
    if (produtoSelecionado && quantidade) {
      try {
        const response = await fetch(`http://localhost:5001/api/estoque/${produtoSelecionado}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ quantidade: parseInt(quantidade, 10) }),
        });

        if (!response.ok) {
          throw new Error("Erro ao atualizar quantidade do produto");
        }

        // Atualiza os produtos na tela
        fetchProdutos();
        setProdutoSelecionado("");
        setQuantidade("");
      } catch (error) {
        console.error("Erro ao atualizar produto:", error);
      }
    } else {
      alert("Por favor, selecione um produto e insira uma quantidade!");
    }
  };

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="sidebar-toggle">
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

        <div className="sidebar-footer">
          <Link to="/dashboard" className="btn-voltar">
            <FaArrowLeft /> <span>Voltar para o Menu</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="top-navbar">
          <div>
            <img src="/hfab.png" alt="Logo" />
          </div>
          <span>GestFarma - Entradas</span>
          <div className="top-navbar-actions">
            <button>
              <FaUserCircle /> Perfil
            </button>
            <button>
              <FaSignOutAlt /> Sair
            </button>
          </div>
        </header>

        <div className="saldo-container">
          <div className="saldo-inputs">
            <select 
              className="select-produto" 
              value={produtoSelecionado} 
              onChange={(e) => setProdutoSelecionado(e.target.value)}
            >
              <option value="">Selecionar um item</option>
              {produtos.map(produto => (
                <option key={produto.ID_Estoque} value={produto.ID_Estoque}>
                  {produto.Nome} - {produto.Local} (Atual: {produto.QuantidadeAtual})
                </option>
              ))}
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

          <table className="tabela-saldo">
            <thead>
              <tr>
                <th>NOME</th>
                <th>QUANTIDADE</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map(produto => (
                <tr key={produto.ID_Estoque}>
                  <td>{produto.Nome}</td>
                  <td>{produto.QuantidadeAtual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Entradas;
