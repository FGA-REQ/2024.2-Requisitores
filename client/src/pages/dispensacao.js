import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import TopNavbar from "../components/topNavbar";
import { pageTitles, getStoredSidebarState, toggleSidebarState } from "../utils/pageUtils";
import * as dispensacaoUtils from "../utils/dispensacaoUtils";
import { fetchUsuarioLogado } from '../utils/loginUtils';
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

  useEffect(() => {
    setIsSidebarOpen(getStoredSidebarState());
    dispensacaoUtils.fetchDadosDispensacao(setDispensacao, setLoading);
    dispensacaoUtils.fetchPacientes(setPacientes);
    dispensacaoUtils.fetchMedicamentos(setMedicamentos);
    fetchUsuarioLogado(setUsuarioLogado);
  }, []);

  useEffect(() => {
    dispensacaoUtils.filterDispensacao(search, dadosDispensacao, setFilteredDispensacao, loading);
  }, [search, dadosDispensacao]);

  const toggleSidebar = () => {
    const newState = toggleSidebarState(isSidebarOpen);
    setIsSidebarOpen(newState);
  };

  const handleNewDispensacaoConfirm = async (modalData2) => {
    await dispensacaoUtils.handleNewDispensacaoConfirm(modalData2, setDispensacao, dadosDispensacao, setShowModal2, setLoading);
  };

  const handleDispensarConfirm = async (modalData) => {
    await dispensacaoUtils.handleDispensarConfirm(modalData, usuarioLogado, setDispensacao, dadosDispensacao, setShowModal);
    dispensacaoUtils.fetchDadosDispensacao(setDispensacao, setLoading);
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
              placeholder="Buscar paciente, prontuário ou medicamento"
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="action-button action-nova-dispensacao"
              onClick={() => dispensacaoUtils.handleNewDispensacaoClick(usuarioLogado, setModalData2, setShowModal2)}
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
                  <th>Data/Hora</th>
                  <th>Ação</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="table-container">
            <table className="tabela-dispensacao">
              <tbody className="scrollable-content">
                {loading ? (
                  <tr><td colSpan="7">Carregando dados...</td></tr>
                ) : filteredDispensacao.length === 0 ? (
                  <tr><td colSpan="7">Nenhum resultado encontrado.</td></tr>
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
                        <td>{disp.DataHora}</td>
                        <td>
                          {isAvailable ? (
                            <button
                              className="action-button action-dispensar"
                              onClick={() => dispensacaoUtils.handleDispensarClick(disp, setModalData, setShowModal)}
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
          {/* Modal dispensar */}
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
                  <button className="modal-button confirm-button" onClick={() => handleDispensarConfirm(modalData)}>Confirmar</button>
                  <button className="modal-button cancel-button" onClick={() => dispensacaoUtils.handleDispensarCancel(setShowModal, setModalData)}>Cancelar</button>
                </div>
              </div>
            </div>
          )}
          {/* Modal nova dispensação */}
          {showModal2 && (
            <div className="modal2">
              <div className="modal-content2">
                <h2>Adicionar nova Dispensação</h2>
                <div className="form-group">
                  <label>Prontuário:</label>
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
                  <label>Medicamento:</label>
                  <select
                    value={modalData2.ID_Medicamento || ''}
                    onChange={(e) => dispensacaoUtils.handleMedicamentoChange(e, setModalData2, medicamentos)}
                  >
                    <option value="">Selecione o medicamento</option>
                    {medicamentos.map((medicamento) => (
                      <option key={medicamento.ID_Medicamento} value={medicamento.ID_Medicamento}>
                        {medicamento.Nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Quantidade prescrita:</label>
                  <input
                    type="number"
                    placeholder="Informe a quantidade"
                    value={modalData2.Quantidade || ''}
                    onChange={(e) => setModalData2({ ...modalData2, Quantidade: e.target.value })}
                  />
                </div>
                <div className="modal-buttons">
                  <button className="modal-button confirm-button" onClick={() => handleNewDispensacaoConfirm(modalData2)}>Confirmar</button>
                  <button className="modal-button cancel-button" onClick={() => dispensacaoUtils.handleDispensarCancel2(setShowModal2, setModalData2)}>Cancelar</button>
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