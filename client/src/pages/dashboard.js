import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Sidebar from '../components/sidebar';
import TopNavbar from '../components/topNavbar';
import { pageTitles, getStoredSidebarState, toggleSidebarState } from '../utils/pageUtils';
import { fetchDashboardData, formatDataForBarChart, formatDataForPieChart, formatDataForLineChart } from '../utils/dashboardUtils';
import { fetchUsuarioLogado } from '../utils/loginUtils';
import './layoutBase.css';
import './dashboard.css';
import { Bar, Pie, Line } from 'react-chartjs-2'; // Importe os componentes de gráficos
import { Chart as ChartJS } from 'chart.js/auto'; // Importe o ChartJS

const Dashboard = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [dadosMedicamentos, setDadosMedicamentos] = useState(null);
    const [medicamentosFabricante, setMedicamentosFabricante] = useState(null); // Novo estado para dados do gráfico de barras
    const [medicamentosControle, setMedicamentosControle] = useState(null); // Novo estado para dados do gráfico de pizza
    const [dispensacaoDia, setDispensacaoDia] = useState(null); // Novo estado para dados do gráfico de linha
    const [loading, setLoading] = useState(true);
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setIsSidebarOpen(getStoredSidebarState());
        fetchDashboardData(setDadosMedicamentos, setLoading);
        fetchUsuarioLogado(setUsuarioLogado);
    }, []);

    useEffect(() => {
        if (dadosMedicamentos) {
            setMedicamentosFabricante(formatDataForBarChart(dadosMedicamentos.fabricante));
            setMedicamentosControle(formatDataForPieChart(dadosMedicamentos.controle));
            setDispensacaoDia(formatDataForLineChart(dadosMedicamentos.dispensacao));
        }
    }, [dadosMedicamentos]);

    const toggleSidebar = () => {
        const newState = toggleSidebarState(isSidebarOpen);
        setIsSidebarOpen(newState);
    };

    return (
        <div className="layout-container">
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="main-content">
                <TopNavbar pageTitle={pageTitles[location.pathname] || "Dashboard"} />
                <div className="scrollable-content"> {/* Div para scroll */}
                    <main className="page-content">
                        {loading ? (
                            <p>Carregando dados...</p>
                        ) : (
                            <div className="dashboard-content"> {/* Container para os gráficos e cards */}
                                <h2>Bem-vindo, {usuarioLogado?.Nome}</h2>
                                <div className="dashboard-cards">
                                    <div className="dashboard-card">
                                        <h3>Total de Medicamentos</h3>
                                        <p>{dadosMedicamentos?.geral?.totalMedicamentos}</p>
                                    </div>
                                    <div className="dashboard-card">
                                        <h3>Quantidade Dispensada</h3>
                                        <p>{dadosMedicamentos?.geral?.totalSaidas}</p>
                                    </div>
                                    <div className="dashboard-card">
                                        <h3>Estoque Baixo</h3>
                                        <p>{dadosMedicamentos?.geral?.acabando}</p>
                                    </div>
                                    <div className="dashboard-card">
                                        <h3>Medicamentos Perto do Vencimento</h3>
                                        <p>{dadosMedicamentos?.geral?.vencendo}</p>
                                    </div>
                                </div>

                                <div className="dashboard-charts">
                                    {medicamentosFabricante?.datasets?.length > 0 && (
                                        <Bar data={medicamentosFabricante} />
                                    )}
                                    {medicamentosControle?.datasets?.length > 0 && (
                                        <Pie data={medicamentosControle} />
                                    )}
                                    {dispensacaoDia?.datasets?.length > 0 && (
                                        <Line data={dispensacaoDia} />
                                    )}
                                </div>
                            </div>
                        )}
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;