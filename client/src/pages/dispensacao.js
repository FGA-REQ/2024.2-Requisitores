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

  useEffect(() => {
    setIsSidebarOpen(getStoredSidebarState());
  }, []);

  const toggleSidebar = () => {
    const newState = toggleSidebarState(isSidebarOpen);
    setIsSidebarOpen(newState);
  };

  const medicamentos = [
    { nome: "Paracetamol 500mg", prescrito: 2, estoque: 5, disponivel: true },
    { nome: "Ibuprofeno 200mg", prescrito: 1, estoque: 0, disponivel: false },
  ];

  return (
    <div className="layout-container">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <TopNavbar pageTitle={pageTitles[location.pathname] || "Dispensação"} />
        <main className="dispensa-container">
          <div className="dispensa-inputs">
            <input
              type="text"
              placeholder="Buscar paciente por CPF ou Nome"
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <table className="tabela-dispensacao">
            <thead>
              <tr>
                <th>MEDICAMENTO</th>
                <th>QTD. PRESCRITA</th>
                <th>ESTOQUE</th>
                <th>AÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {medicamentos.map((med, index) => (
                <tr key={index}>
                  <td>{med.nome}</td>
                  <td>{med.prescrito}</td>
                  <td>{med.estoque > 0 ? med.estoque : <span className="icon-warning">⚠️</span>}</td>
                  <td>
                    {med.disponivel ? (
                      <button className="action-button action-dispensar">✔️ Dispensar</button>
                    ) : (
                      <button className="action-button action-indisponivel">Indisponível</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Dispensacao;
