import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { login } from "../utils/loginUtils";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ nome: "", login: "", senha: "", perfil: "Técnico de Farmácia" });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("/api/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      alert(data.mensagem);
      if (response.ok) setShowModal(false);
    } catch (error) {
      console.error("Erro ao registrar usuário", error);
    }
  };

  return (
    <div className="login-container">
      {/* Cabeçalho */}
      <div className="login-header">
        <div>
          <img src="/hfab.png" alt="HMAB" className="hmab-logo" />
        </div>
        <div>
          <h1>Hospital da Força Aérea de Brasília</h1>
          <p>GestFarma</p>
        </div>
        <button className="register-button" onClick={() => setShowModal(true)}>
          Cadastrar Usuário
        </button>
      </div>

      {/* Espaço Central */}
      <div className="login-center">
        <div className="login-box">
          <img src="/fab_logo.png" alt="FAB_logo" className="login-logo" />
          <h2 className="login-title">Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label>Usuário</label>
              <div className="login-input">
                <FaEnvelope className="icon" />
                <input
                  type="text"
                  placeholder="Digite seu usuário"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="login-input-group">
              <label>Senha</label>
              <div className="login-input">
                <FaLock className="icon" />
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="login-button">Entrar</button>
          </form>
        </div>
      </div>

      {/* Modal de Cadastro */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Cadastrar Novo Usuário</h2>
            <input
              type="text"
              placeholder="Nome"
              value={newUser.nome}
              onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
            />
            <input
              type="text"
              placeholder="Login"
              value={newUser.login}
              onChange={(e) => setNewUser({ ...newUser, login: e.target.value })}
            />
            <input
              type="password"
              placeholder="Senha"
              value={newUser.senha}
              onChange={(e) => setNewUser({ ...newUser, senha: e.target.value })}
            />
            <button onClick={handleRegister}>Registrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;