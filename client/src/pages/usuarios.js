import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import Sidebar from '../components/sidebar';
import TopNavbar from '../components/topNavbar';
import { getAuthToken } from '../utils/localStorageUtils';
import { pageTitles, getStoredSidebarState, toggleSidebarState } from '../utils/pageUtils';
import './layoutBase.css';
import './usuarios.css';

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5001";

const Usuarios = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [perfil, setPerfil] = useState('');
  const [editando, setEditando] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(getStoredSidebarState());
    carregarUsuarios();
  }, []);

  const toggleSidebar = () => {
    const newState = toggleSidebarState(isSidebarOpen);
    setIsSidebarOpen(newState);
  };

  const carregarUsuarios = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${apiUrl}/api/usuarios`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsuarios(response.data.usuarios);
    } catch (error) {
      console.error("❌ Erro ao carregar usuários:", error.response?.data || error);
      alert("Erro ao carregar usuários. Verifique sua conexão ou permissões.");
    }
  };

  const salvarUsuario = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      if (!token) {
        alert("Você não está autenticado. Faça login novamente.");
        return;
      }

      const usuario = { Nome: nome, Login: login, Senha: senha, Perfil: perfil };

      if (editando) {
        await axios.put(`${apiUrl}/api/usuarios/${editando}`, usuario, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${apiUrl}/api/usuarios`, usuario, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setNome('');
      setLogin('');
      setSenha('');
      setPerfil('');
      setEditando(null);
      carregarUsuarios();
    } catch (error) {
      console.error("❌ Erro ao salvar usuário:", error.response?.data || error);
      alert("Erro ao salvar usuário. Verifique se você tem permissão.");
    }
  };

  const excluirUsuario = async (id) => {
    try {
      const token = getAuthToken();
      await axios.delete(`${apiUrl}/api/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      carregarUsuarios();
    } catch (error) {
      console.error("❌ Erro ao excluir usuário:", error.response?.data || error);
      alert("Erro ao excluir usuário. Verifique sua permissão.");
    }
  };

  return (
    <div className="layout-container">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <TopNavbar pageTitle={pageTitles[location.pathname] || "Usuários"} />
        <main className="page-content">
          <div className="usuarios-container">
            <h2>Gerenciamento de Usuários</h2>

            <form onSubmit={salvarUsuario} className="usuarios-form">
              <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
              <input type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} required />
              <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
              <input type="text" placeholder="Perfil" value={perfil} onChange={(e) => setPerfil(e.target.value)} required />

              <button type="submit">{editando ? "Atualizar" : "Adicionar"} Usuário</button>
            </form>

            <table className="usuarios-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Login</th>
                  <th>Perfil</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.ID_Usuario}>
                    <td>{usuario.Nome}</td>
                    <td>{usuario.Login}</td>
                    <td>{usuario.Perfil}</td>
                    <td>
                      <button className="edit-btn" onClick={() => {
                        setNome(usuario.Nome);
                        setLogin(usuario.Login);
                        setPerfil(usuario.Perfil);
                        setEditando(usuario.ID_Usuario);
                      }}>Editar</button>
                      <button className="delete-btn" onClick={() => excluirUsuario(usuario.ID_Usuario)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Usuarios;
