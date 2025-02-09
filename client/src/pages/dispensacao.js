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
  const [showModal2, setShowModal2] = useState(false);
  const [modalData2, setModalData2] = useState(null);
  const [pacientes, setPacientes] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const handleDispensarClick = (disp) => {
    setModalData(disp);
    setShowModal(true);
  };

  const handleNewDispensacaoClick = () => {
    setModalData2({ ID_Usuario: usuarioLogado?.ID_Usuario });
    setShowModal2(true);
  };

  useEffect(() => {
    setIsSidebarOpen(getStoredSidebarState());
    fetchDadosDispensacao();
    fetchPacientes();
    fetchMedicamentos();
    fetchUsuarioLogado();
  }, []);

  useEffect(() => {
    filterDispensacao();
  }, [search, dadosDispensacao]);

  const fetchDadosDispensacao = async () => {
    try {
      const response = await fetch('/api/dispensacoesTabela');
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
      const response = await fetch(`/api/dispensacoes/${modalData.idMedicamento}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantidade: modalData.Prescrito }),
      });

      if (response.ok) {
        const data = await response.json();
        setDispensacao(data.dispensacao);
        setShowModal(false);
      } else {
        console.error("Erro ao dispensar medicamento:", response.status);
      }
    } catch (error) {
      console.error("Erro ao dispensar medicamento:", error);
    }
  };

  const handleDispensarCancel = () => {
    setShowModal(false);
    setModalData(null);
  };

  const fetchPacientes = async () => {
    try {
      const response = await fetch('/api/pacientes');
      const data = await response.json();
      setPacientes(data.pacientes || []);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  };

  const fetchMedicamentos = async () => {
    try {
      const response = await fetch('/api/medicamentos');
      const data = await response.json();
      const medicamentosOrdenados = ordenarMedicamentosPorValidade(data.medicamentos || []);
      setMedicamentos(medicamentosOrdenados);
    } catch (error) {
      console.error("Erro ao buscar medicamentos:", error);
    }
  };

  const fetchUsuarioLogado = async () => {
    try {
      const response = await fetch('/api/usuarioLogado');
      const data = await response.json();
      setUsuarioLogado(data.usuario);
    } catch (error) {
      console.error("Erro ao buscar usuário logado:", error);
    }
  };

  const handleDispensarCancel2 = () => {
    setShowModal2(false);
    setModalData2(null);
  };

  const handleNewDispensacaoConfirm = async () => {
    if (!modalData2) return;

    try {
      const response = await fetch('/api/dispensacoes', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modalData2),
      });

      if (response.ok) {
        const data = await response.json();
        setDispensacao([...dadosDispensacao, data]);
        setShowModal2(false);
      } else {
        console.error("Erro ao adicionar dispensação:", response.status);
      }
    } catch (error) {
      console.error("Erro ao adicionar dispensação:", error);
    }
  };

  const ordenarMedicamentosPorValidade = (medicamentos) => {
    return medicamentos.sort((a, b) => {
      const dataA = new Date(a.Validade);
      const dataB = new Date(b.Validade);
      return dataA - dataB;
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
            <button
              className="action-button action-nova-dispensacao"
              onClick={() => handleNewDispensacaoClick()}
            >
              Nova Dispensação
            </button>
          </div>
          <div>
            <table className="tabela-dispensacao">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Prontuário</th>
                  <th>Medicamento</th>
                  <th>Qtd. Prescrita</th>
                  <th>Estoque</th>
                  <th>Ação</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="table-container">
            <table className="tabela-dispensacao">
              <tbody className="scrollable-content">
                {loading ? (
                  <tr><td colSpan="6">Carregando dados...</td></tr>
                ) : filteredDispensacao.length === 0 ? (
                  <tr><td colSpan="6">Nenhum resultado encontrado.</td></tr>
                ) : (
                  filteredDispensacao.map((disp) => {
                    const isAvailable = disp.Estoque >= disp.Prescrito;
                    return (
                      <tr key={disp.idMedicamento}>
                        <td>{disp.Paciente}</td>
                        <td>{disp.Prontuario}</td>
                        <td>{disp.Medicamento}</td>
                        <td>{disp.Prescrito}</td>
                        <td>{disp.Estoque} {disp.Estoque < disp.Prescrito && <span className="icon-warning">⚠️</span>}</td>
                        <td>
                          {isAvailable ? (
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
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          {/* Modal dispensar*/}
          {showModal && modalData && (
            <div className="modal">
              <div className="modal-content">
                <h2>Confirmar Dispensação</h2>
                <p><strong>Medicamento:</strong> {modalData.Medicamento}</p>
                <p><strong>Paciente:</strong> {modalData.Paciente}</p>
                <p><strong>Prontuário:</strong> {modalData.Prontuario}</p>
                <p><strong>Quantidade Prescrita:</strong> {modalData.Prescrito}</p>
                <p><strong>Estoque:</strong> {modalData.Estoque}</p>
                <p><strong>Local:</strong> {modalData.Local}</p>
                <p><strong>Validade:</strong> {modalData.Validade}</p>
                <div className="modal-buttons">
                  <button className="modal-button confirm-button" onClick={handleDispensarConfirm}>Confirmar</button>
                  <button className="modal-button cancel-button" onClick={handleDispensarCancel}>Cancelar</button>
                </div>
              </div>
            </div>
          )}
          {/* Modal nova dispensação*/}
          {showModal2 && (
            <div className="modal2">
              <div className="modal-content2">
                <h2>Adicionar nova Dispensação</h2>
                <div className="form-group">
                  <label>Prontuário: </label>
                  <select
                    value={modalData2.ID_Paciente || ''}
                    onChange={(e) => setModalData2({ ...modalData2, ID_Paciente: e.target.value })}
                  >
                    <option value="">Selecione o prontuário</option>
                    {pacientes.map((paciente) => (
                      <option key={paciente.ID_Paciente} value={paciente.ID_Paciente}>
                        {paciente.Prontuario}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Medicamento: </label>
                  <select
                    value={modalData2.ID_Lote || ''}
                    onChange={(e) => setModalData2({ ...modalData2, ID_Lote: e.target.value })}
                  >
                    <option value="">Selecione o medicamento</option>
                    {medicamentos.map((medicamento) => (
                      <option key={medicamento.ID_Lote} value={medicamento.ID_Lote}>
                        {medicamento.Nome} - {medicamento.Validade}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Quantidade prescrita: </label>
                  <input
                    type="number"
                    placeholder="Informe a quantidade"
                    value={modalData2.Quantidade || ''}
                    onChange={(e) => setModalData2({ ...modalData2, Quantidade: e.target.value })}
                  />
                </div>
                <div className="modal-buttons">
                  <button className="modal-button confirm-button" onClick={handleNewDispensacaoConfirm}>Confirmar</button>
                  <button className="modal-button cancel-button" onClick={handleDispensarCancel2}>Cancelar</button>
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