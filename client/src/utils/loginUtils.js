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
  