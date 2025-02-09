import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Sidebar from '../components/sidebar';
import TopNavbar from '../components/topNavbar';
import { pageTitles, getStoredSidebarState, toggleSidebarState } from '../utils/pageUtils';
import { fetchInventoryData } from '../utils/relatorioUtils';
import './layoutBase.css';
import './relatorios.css';

const InventoryReport = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [inventoryData, setInventoryData] = useState(null);
    const [activeTable, setActiveTable] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setIsSidebarOpen(getStoredSidebarState());
        fetchInventoryData(setInventoryData);
    }, []);

    const toggleSidebar = () => {
        const newState = toggleSidebarState(isSidebarOpen);
        setIsSidebarOpen(newState);
    };

    const renderTable = (data, columns, headers) => (
        <table className="tabela-relatorio">
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}>{row[col]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="layout-container">
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="main-content">
                <TopNavbar pageTitle={pageTitles[location.pathname] || "Relatório de Estoque"} />
                <div className="scrollable-content">
                    <main className="page-content">
                        {inventoryData ? (
                            <div className="relatorio-content">
                                <div className="relatorio-buttons">
                                    <button className={activeTable === 'fabricante' ? 'active' : ''} onClick={() => setActiveTable('fabricante')}>Mostrar Tabela de Fabricantes</button>
                                    <button className={activeTable === 'validade' ? 'active' : ''} onClick={() => setActiveTable('validade')}>Mostrar Tabela de Validade</button>
                                    <button className={activeTable === 'movimentacao' ? 'active' : ''} onClick={() => setActiveTable('movimentacao')}>Mostrar Tabela de Movimentação</button>
                                    <button className={activeTable === 'medicamentosMaisDispensados' ? 'active' : ''} onClick={() => setActiveTable('medicamentosMaisDispensados')}>Mostrar Medicamentos Mais Dispensados</button>
                                    <button className={activeTable === 'pacientesMaisDispensacoes' ? 'active' : ''} onClick={() => setActiveTable('pacientesMaisDispensacoes')}>Mostrar Pacientes com Mais Dispensações</button>
                                    <button className={activeTable === 'usuariosMaisDispensacoes' ? 'active' : ''} onClick={() => setActiveTable('usuariosMaisDispensacoes')}>Mostrar Usuários com Mais Dispensações</button>
                                </div>
                                {activeTable === 'fabricante' && inventoryData.estoqueFabricante && renderTable(inventoryData.estoqueFabricante, ['name', 'quantidade'], ['Fabricante', 'Quantidade'])}
                                {activeTable === 'validade' && inventoryData.validade && renderTable(inventoryData.validade, ['name', 'value'], ['Validade', 'Quantidade'])}
                                {activeTable === 'movimentacao' && inventoryData.movimentacaoMensal && renderTable(inventoryData.movimentacaoMensal, ['name', 'entradas', 'saidas'], ['Data', 'Entradas', 'Saídas'])}
                                {activeTable === 'medicamentosMaisDispensados' && inventoryData.medicamentosMaisDispensados && renderTable(inventoryData.medicamentosMaisDispensados, ['name', 'quantidade'], ['Medicamento', 'Quantidade'])}
                                {activeTable === 'pacientesMaisDispensacoes' && inventoryData.pacientesMaisDispensacoes && renderTable(inventoryData.pacientesMaisDispensacoes, ['name', 'quantidade'], ['Paciente', 'Quantidade'])}
                                {activeTable === 'usuariosMaisDispensacoes' && inventoryData.usuariosMaisDispensacoes && renderTable(inventoryData.usuariosMaisDispensacoes, ['name', 'quantidade'], ['Usuário', 'Quantidade'])}
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
