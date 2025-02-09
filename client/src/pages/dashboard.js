import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Sidebar from '../components/sidebar';
import TopNavbar from '../components/topNavbar';
import { pageTitles, getStoredSidebarState, toggleSidebarState } from '../utils/pageUtils';
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
    const location = useLocation();

    useEffect(() => {
        setIsSidebarOpen(getStoredSidebarState());
        fetchDadosMedicamentos();
    }, []);

    const fetchDadosMedicamentos = async () => {
        try {
            const response = await fetch('/api/dashboard');
            const data = await response.json();

            setDadosMedicamentos(data.geral); // Dados gerais do dashboard
            setMedicamentosFabricante(formatDataForBarChart(data.fabricante)); // Dados para o gráfico de barras
            setMedicamentosControle(formatDataForPieChart(data.controle)); // Dados para o gráfico de pizza
            setDispensacaoDia(formatDataForLineChart(data.dispensacao)); // Dados para o gráfico de linha
        } catch (error) {
            console.error("Erro ao buscar dados do dashboard:", error);
        }
    };

    const formatDataForBarChart = (data) => { 
        const labels = data.map(item => item.fabricante);
        const datasets = [{
            label: 'Número de medicamentos por fabricante',
            data: data.map(item => item.quantidade),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
        }];
    
        const resultado = { labels, datasets };
        return resultado;
    };

    const formatDataForPieChart = (data) => {
        if (!data || data.length === 0) return null;

        const labels = data.map(item => item.controle ? 'Controlado' : 'Não controlado');
        const datasets = [{
            label: 'Porcentagem de medicamentos por tipo de controle',
            data: data.map(item => item.quantidade),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
        }];

        return { labels, datasets };
    };

    const formatDataForLineChart = (data) => {
        if (!data || data.length === 0) return null;

        const labels = data.map(item => item.data);
        const datasets = [{
            label: 'Quantidade de medicamentos dispensados por dia',
            data: data.map(item => item.quantidade),
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            fill: false,
        }];

        return { labels, datasets };
    };


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
                        {dadosMedicamentos ? (
                            <div className="dashboard-content"> {/* Container para os gráficos e cards */}
                                <div className="dashboard-cards">
                                    <div className="dashboard-card">
                                        <h3>Total de Medicamentos</h3>
                                        <p>{dadosMedicamentos.totalMedicamentos}</p>
                                    </div>
                                    <div className="dashboard-card">
                                        <h3>Quantidade Dispensada</h3>
                                        <p>{dadosMedicamentos.totalSaidas}</p>
                                    </div>
                                    <div className="dashboard-card">
                                        <h3>Estoque Baixo</h3>
                                        <p>{dadosMedicamentos.acabando}</p>
                                    </div>
                                    <div className="dashboard-card">
                                        <h3>Medicamentos Perto do Vencimento</h3>
                                        <p>{dadosMedicamentos.vencendo}</p>
                                    </div>
                                </div>

                                <div className="dashboard-charts">
                                    {medicamentosFabricante && medicamentosFabricante.datasets && medicamentosFabricante.datasets.length > 0 && (
                                        <Bar data={medicamentosFabricante} />
                                    )}
                                    {medicamentosControle && medicamentosControle.datasets && medicamentosControle.datasets.length > 0 && (
                                        <Pie data={medicamentosControle} />
                                    )}
                                    {dispensacaoDia && dispensacaoDia.datasets && dispensacaoDia.datasets.length > 0 && (
                                        <Line data={dispensacaoDia} />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p>Carregando dados...</p>
                        )}
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;