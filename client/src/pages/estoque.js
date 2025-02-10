import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaArrowDown, FaChartLine, FaArrowUp, FaBox, FaUserCircle, FaSignOutAlt, FaArrowLeft, FaTrash } from "react-icons/fa";
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

  const handleCadastrar = async () => {
    if (produto.trim() !== "") {
      const novoProduto = {
        ID_Lote: Math.floor(Math.random() * 1000), // Gerar ID aleatório temporário
        QuantidadeAtual: 1,  // Definir quantidade inicial
        Local: "Prateleira A", // Definir um local padrão (pode ser um input)
      };
  
      try {
        const response = await fetch("http://localhost:5001/api/estoque", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adicionar token se necessário
          },
          body: JSON.stringify(novoProduto),
        });
  
        const data = await response.json();
        if (response.ok) {
          setProdutos([...produtos, { ...novoProduto, ID_Estoque: data.id }]);
          setProduto("");
        } else {
          console.error("Erro ao adicionar produto:", data.error);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }
  };
  

  const handleDeletar = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5001/api/estoque/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir produto");
      }

      setProdutos(produtos.filter((p) => p.ID_Estoque !== id));
    } catch (error) {
      alert(error.message);
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
          <div className="sidebar-footer">
            <Link to="/dashboard" className="btn-voltar">
              <FaArrowLeft /> <span>Voltar para o Menu</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="top-navbar">
          <div>
            <img src="/hfab.png" alt="Logo" />
          </div>
          <span>GestFarma - Estoque</span>
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
            <button onClick={handleCadastrar} className="btn-cadastrar">
              CADASTRAR
            </button>
          </div>

          {/* Tabela de Produtos */}
          <div className="tabela-container">
            <table className="tabela-estoque">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Local</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.length > 0 ? (
                  produtos.map((item) => (
                    <tr key={item.ID_Estoque}>
                      <td>{item.ID_Estoque}</td>
                      <td>{item.Nome || "Sem nome"}</td>
                      <td>{item.QuantidadeAtual}</td>
                      <td>{item.Local}</td>
                      <td>
                        <button onClick={() => handleDeletar(item.ID_Estoque)} className="btn-deletar">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>Nenhum produto no estoque.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Estoque;
