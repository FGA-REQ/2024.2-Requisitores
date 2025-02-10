import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Dispensacao from "./pages/dispensacao";
import Estoque from "./pages/estoque";
import Relatorios from "./pages/relatorios";
import Usuarios from "./pages/usuarios";
import Entradas from "./pages/entradas";
import NotAuthorized from "./pages/NotAuthorized";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} allowedRoles={['Administrador', 'Farmacêutico', 'Técnico de Farmácia', 'Auditor']} />} />
        <Route path="/dispensacao" element={<ProtectedRoute element={Dispensacao} allowedRoles={['Administrador', 'Farmacêutico', 'Técnico de Farmácia', 'Auditor']} />} />
        <Route path="/estoque" element={<ProtectedRoute element={Estoque} allowedRoles={['Administrador', 'Farmacêutico', 'Auditor']} />} />
        <Route path="/relatorios" element={<ProtectedRoute element={Relatorios} allowedRoles={['Administrador', 'Auditor']} />} />
        <Route path="/usuarios" element={<ProtectedRoute element={Usuarios} allowedRoles={['Administrador', 'Auditor']} />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/entradas" element={<Entradas />} />
      </Routes>
    </Router>
  );
}

export default App;