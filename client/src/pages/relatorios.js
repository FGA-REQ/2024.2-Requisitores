import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Sidebar from '../components/sidebar';
import TopNavbar from '../components/topNavbar';
import { pageTitles, getStoredSidebarState, toggleSidebarState } from '../utils/pageUtils';
import './layoutBase.css';
import './dashboard.css';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const InventoryReport = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [inventoryData, setInventoryData] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setIsSidebarOpen(getStoredSidebarState());
        fetchInventoryData();
    }, []);

    const fetchInventoryData = async () => {
        try {
            const response = await fetch('/api/inventory-report');
            const data = await response.json();
            setInventoryData(data);
        } catch (error) {
            console.error("Erro ao buscar dados do relatório:", error);
        }
    };

    const toggleSidebar = () => {
        const newState = toggleSidebarState(isSidebarOpen);
        setIsSidebarOpen(newState);
    };

    const formatBarChartData = (data) => ({
        labels: data.estoqueCategoria.map(item => item.name),
        datasets: [{
            label: 'Quantidade por Categoria',
            data: data.estoqueCategoria.map(item => item.quantidade),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    });

    const formatPieChartData = (data) => ({
        labels: data.validade.map(item => item.name),
        datasets: [{
            data: data.validade.map(item => item.value),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    });

    const formatLineChartData = (data) => ({
        labels: data.movimentacaoMensal.map(item => item.name),
        datasets: [
            {
                label: 'Entradas',
                data: data.movimentacaoMensal.map(item => item.entradas),
                borderColor: 'rgba(54, 162, 235, 1)',
                tension: 0.1,
                fill: false
            },
            {
                label: 'Saídas',
                data: data.movimentacaoMensal.map(item => item.saidas),
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1,
                fill: false
            }
        ]
    });

    return (
        <div className="layout-container">
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="main-content">
                <TopNavbar pageTitle={pageTitles[location.pathname] || "Relatório de Estoque"} />
                <div className="scrollable-content">
                    <main className="page-content">
                        {inventoryData ? (
                            <div className="dashboard-content">
                                <div className="dashboard-cards">
                                    <div className="dashboard-card">
                                        <h3>Total de Medicamentos</h3>
                                        <p>{inventoryData.geral.totalMedicamentos}</p>
                                    </div>
                                    <div className="dashboard-card">
                                        <h3>Medicamentos Controlados</h3>
                                        <p>{inventoryData.geral.medicamentosControlados}</p>
                                    </div>
                                    <div className="dashboard-card">
                                        <h3>Baixo Estoque</h3>
                                        <p>{inventoryData.geral.medicamentosBaixoEstoque}</p>
                                    </div>
                                    <div className="dashboard-card">
                                        <h3>Valor Total em Estoque</h3>
                                        <p>R$ {inventoryData.geral.valorTotalEstoque.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="dashboard-charts">
                                    <div className="chart-container">
                                        <h3>Distribuição por Categoria</h3>
                                        <Bar 
                                            data={formatBarChartData(inventoryData)}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false
                                            }}
                                            height={300}
                                        />
                                    </div>

                                    <div className="chart-container">
                                        <h3>Distribuição por Validade</h3>
                                        <Pie 
                                            data={formatPieChartData(inventoryData)}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false
                                            }}
                                            height={300}
                                        />
                                    </div>

                                    <div className="chart-container">
                                        <h3>Movimentação Mensal</h3>
                                        <Line 
                                            data={formatLineChartData(inventoryData)}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false
                                            }}
                                            height={300}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Carregando dados...</p>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default InventoryReport;
