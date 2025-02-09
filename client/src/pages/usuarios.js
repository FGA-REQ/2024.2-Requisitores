import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import Sidebar from '../components/sidebar';
import TopNavbar from '../components/topNavbar';
import { pageTitles, getStoredSidebarState, toggleSidebarState } from '../utils/pageUtils';
import './layoutBase.css';
import './usuarios.css';

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
      const response = await axios.get('http://localhost:5001/api/usuarios');
      setUsuarios(response.data.usuarios);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  const salvarUsuario = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await axios.put(`http://localhost:5001/api/usuarios/${editando}`, {
          Nome: nome,
          Login: login,
          Senha: senha,
          Perfil: perfil
        });
      } else {
        await axios.post('http://localhost:5001/api/usuarios', {
          Nome: nome,
          Login: login,
          Senha: senha,
          Perfil: perfil
        });
      }
      setNome('');
      setLogin('');
      setSenha('');
      setPerfil('');
      setEditando(null);
      carregarUsuarios();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  const excluirUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/usuarios/${id}`);
      carregarUsuarios();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
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
              <select value={perfil} onChange={(e) => setPerfil(e.target.value)} required>
                <option value="">Selecione o Perfil</option>
                <option value="admin">Admin</option>
                <option value="user">Usuário</option>
              </select>
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
