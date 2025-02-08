import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Dispensacao from "./pages/dispensacao";
import Estoque from "./pages/estoque";
import Relatorios from "./pages/relatorios";
import Usuarios from "./pages/usuarios";
import Saldo from "./pages/saldo";
import Entradas from "./pages/entradas";
import Saidas from "./pages/saidas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dispensacao" element={<Dispensacao />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/saldo" element={<Saldo />} />
        <Route path="/entradas" element={<Entradas />} />
        <Route path="/saidas" element={<Saidas />} />
      </Routes>
    </Router>
  );
}

export default App;