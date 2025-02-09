export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
export const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const getAuthToken = () => {
  return localStorage.getItem("token"); 
};

export const setAuthToken = (token) => {
  if (token) {
      localStorage.setItem("token", token);
  } else {
      localStorage.removeItem("token");
  }
};

export const getUsuarioLogado = () => {
  return getFromLocalStorage("usuario");
};

export const setUsuarioLogado = (user) => {
  if (user) {
      saveToLocalStorage("usuario", user);
  } else {
      removeFromLocalStorage("usuario");
  }
};

// ✅ Função para Logout
export const logout = () => {
  removeFromLocalStorage("token");
  removeFromLocalStorage("usuario");
  window.location.href = "/login";
};