export const login = async (email, password) => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5001"; // Usando variável de ambiente para a URL

  try {
    const response = await fetch(`${apiUrl}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: email, senha: password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } else {
      alert(data.mensagem); // Exibe a mensagem de erro se o login falhar
    }
  } catch (error) {
    alert("Ocorreu um erro, por favor, tente novamente.");
  }
};

export const fetchUsuarioLogado = async (setUsuarioLogado) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/usuarioLogado', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.status === 401) {
      window.location.href = "/login";
      return;
    }
    const data = await response.json();
    setUsuarioLogado(data.usuario);
  } catch (error) {
    console.error("Erro ao buscar usuário logado:", error);
    window.location.href = "/login";
  }
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};
