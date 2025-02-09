import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Sidebar from '../components/sidebar';
import TopNavbar from '../components/topNavbar';
import { pageTitles, getStoredSidebarState, toggleSidebarState } from '../utils/pageUtils';
import { fetchDashboardData, formatDataForBarChart, formatDataForPieChart, formatDataForLineChart } from '../utils/dashboardUtils';
import { fetchUsuarioLogado } from '../utils/loginUtils';
import './layoutBase.css';
import './dashboard.css';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Dashboard = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [dadosMedicamentos, setDadosMedicamentos] = useState(null);
    const [medicamentosFabricante, setMedicamentosFabricante] = useState(null);
    const [medicamentosControle, setMedicamentosControle] = useState(null);
    const [dispensacaoDia, setDispensacaoDia] = useState(null);
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

    const exportarCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Tipo,Nome,Valor\n";
        
        if (medicamentosFabricante) {
            medicamentosFabricante.labels.forEach((label, index) => {
                csvContent += `Barra,${label},${medicamentosFabricante.datasets[0].data[index]}\n`;
            });
        }
        
        if (medicamentosControle) {
            medicamentosControle.labels.forEach((label, index) => {
                csvContent += `Pizza,${label},${medicamentosControle.datasets[0].data[index]}\n`;
            });
        }
        
        if (dispensacaoDia) {
            dispensacaoDia.labels.forEach((label, index) => {
                csvContent += `Linha,${label},${dispensacaoDia.datasets[0].data[index]}\n`;
            });
        }
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "dados_dashboard.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="layout-container">
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="main-content">
                <TopNavbar pageTitle={pageTitles[location.pathname] || "Dashboard"} />
                <div className="scrollable-content">
                    <main className="page-content">
                        {loading ? (
                            <p>Carregando dados...</p>
                        ) : (
                            <div className="dashboard-content">
                                <h2>Bem-vindo, {usuarioLogado?.Nome}</h2>
                                <button onClick={exportarCSV} className="export-button">Gerar relatório</button>
                                <div className="dashboard-cards">
                                    <div className="dashboard-card"><h3>Total de Medicamentos</h3><p>{dadosMedicamentos?.geral?.totalMedicamentos}</p></div>
                                    <div className="dashboard-card"><h3>Quantidade Dispensada</h3><p>{dadosMedicamentos?.geral?.totalSaidas}</p></div>
                                    <div className="dashboard-card"><h3>Estoque Baixo</h3><p>{dadosMedicamentos?.geral?.acabando}</p></div>
                                    <div className="dashboard-card"><h3>Medicamentos Perto do Vencimento</h3><p>{dadosMedicamentos?.geral?.vencendo}</p></div>
                                </div>
                                <div className="dashboard-charts">
                                    {medicamentosFabricante?.datasets?.length > 0 && (<Bar data={medicamentosFabricante} />)}
                                    {medicamentosControle?.datasets?.length > 0 && (<Pie data={medicamentosControle} />)}
                                    {dispensacaoDia?.datasets?.length > 0 && (<Line data={dispensacaoDia} />)}
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