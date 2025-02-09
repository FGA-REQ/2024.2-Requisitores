import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import TopNavbar from "../components/topNavbar";
import { pageTitles, getStoredSidebarState, toggleSidebarState } from "../utils/pageUtils";
import "./layoutBase.css";
import "./dispensacao.css";

const Dispensacao = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [filteredDispensacao, setFilteredDispensacao] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dadosDispensacao, setDispensacao] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleDispensarClick = (disp) => {
        setModalData(disp);
        setShowModal(true);
  };


  useEffect(() => {
    setIsSidebarOpen(getStoredSidebarState());
    fetchDadosDispensacao();
  }, []);

  useEffect(() => {
    filterDispensacao();
  }, [search, dadosDispensacao]);


  const fetchDadosDispensacao = async () => {
    try {
      const response = await fetch('/api/dispensacao');
      const data = await response.json();
  
      setDispensacao(data.dispensacao || []);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados da dispensação:", error);
      setLoading(false);
    }
  };

  const filterDispensacao = () => {
    if (loading) return;

    if (!search) {
        setFilteredDispensacao(dadosDispensacao);
        return;
    }

    const searchTerm = search.toLowerCase();

    const filtered = dadosDispensacao.filter((disp) => {
        const paciente = disp.Paciente ? disp.Paciente.toLowerCase() : "";
        const medicamento = disp.Medicamento ? disp.Medicamento.toLowerCase() : "";

        return paciente.includes(searchTerm) || medicamento.includes(searchTerm);
    });

    setFilteredDispensacao(filtered);
  };

  const handleDispensarConfirm = async () => {
    if (!modalData) return;

    try {
        const response = await fetch(`/api/dispensacao/${modalData.idMedicamento}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantidade: modalData.Prescrito }),
        });

        if (response.ok) {
            const data = await response.json();
            setDispensacao(data.dispensacao);
            setShowModal(false); // Fecha o modal após a confirmação
        } else {
            console.error("Erro ao dispensar medicamento:", response.status);
            // Lidar com o erro, por exemplo, exibindo uma mensagem para o usuário
        }
    } catch (error) {
        console.error("Erro ao dispensar medicamento:", error);
        // Lidar com o erro
    }
  };

  const handleDispensarCancel = () => {
    setShowModal(false);
    setModalData(null);
  };


  const ordenarPorVencimento = (dados) => {
    return [...dados].sort((a, b) => {
        const dataVencimentoA = new Date(a.dataVencimento);
        const dataVencimentoB = new Date(b.dataVencimento);
        return dataVencimentoA - dataVencimentoB;
    });
  };


  const toggleSidebar = () => {
    const newState = toggleSidebarState(isSidebarOpen);
    setIsSidebarOpen(newState);
  };

  return (
    <div className="layout-container">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <TopNavbar pageTitle={pageTitles[location.pathname] || "Dispensação"} />
        <main className="dispensa-container">
          <div className="dispensa-inputs">
            <input
              type="text"
              placeholder="Buscar paciente ou medicamento"
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <table className="tabela-dispensacao">
            <thead>
              <tr>
                <th>Paciente</th>
                <th>MEDICAMENTO</th>
                <th>QTD. PRESCRITA</th>
                <th>ESTOQUE</th>
                <th>AÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                  <tr><td colSpan="5">Carregando dados...</td></tr>
                ) : filteredDispensacao.length === 0 ? (
                  <tr><td colSpan="5">Nenhum resultado encontrado.</td></tr>
                ) : (
                    filteredDispensacao.map((disp, index) => (
                        <tr key={index}>
                    <td>{disp.Paciente}</td>
                    <td>{disp.Medicamento}</td>
                    <td>{disp.Prescrito}</td>
                    <td>{disp.Estoque} {disp.Estoque < disp.Prescrito && <span className="icon-warning">⚠️</span>}</td>
                    <td>
                      {disp.Estoque >= disp.Prescrito ? ( 
                          <button
                              className="action-button action-dispensar"
                              onClick={() => handleDispensarClick(disp)}
                          >
                              ✔️ Dispensar
                          </button>
                      ) : (
                          <button className="action-button action-indisponivel">
                              Indisponível
                          </button>
                      )}
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
          {/* Modal */}
          {showModal && modalData && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmar Dispensação</h2>
                        <p>Medicamento: {modalData.Medicamento}</p>
                        <p>Paciente: {modalData.Paciente}</p>
                        <p>Quantidade Prescrita: {modalData.Prescrito}</p>
                        <p>Estoque: {modalData.Estoque}</p>
                        <p>Estoque: {modalData.Local}</p>
                        <p>Validade: {modalData.Validade}</p>
                        <div className="modal-buttons">
                            <button onClick={handleDispensarConfirm}>Confirmar</button>
                            <button onClick={handleDispensarCancel}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default Dispensacao;