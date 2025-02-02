import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted", { email, password });
  };

  return (
    <div className="login-container">
      {/* Cabeçalho */}
      <div className="login-header">
        <div>
        <img src="/hfab.jpg" alt="HMAB" className="hmab-logo"/>
        </div>
        <div>
          <h1>Hospital da Força Aérea de Brasília</h1>
          <p>GestFarma</p>
        </div>
      </div>

      {/* Espaço Central (com imagem de fundo) */}
      <div className="login-center">
        {/* Espaço do Login */}
        <div className="login-box">
          <img src="/fab_logo.png" alt="FAB_logo" className="login-logo" />
          <h2 className="login-title">Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label>Email</label>
              <div className="login-input">
                <FaEnvelope className="icon" />
                <input
                  type="email"
                  placeholder="Digite seu email"
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
            <div className="forgot-password">Esqueceu a senha?</div>
            <button type="submit" className="login-button">
              Entrar
            </button>
          </form>
        </div>
      </div>

      {/* Rodapé */}
      <div className="login-footer">
          <h1>FORÇA AÉREA BRASILEIRA</h1>
          <h2>Asas que protegem o País</h2>
      </div>
    </div>
  );
};

export default Login;