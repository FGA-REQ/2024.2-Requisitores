// Constantes de título de página
export const pageTitles = {
  "/dashboard": "Dashboard",
  "/dispensacao": "Dispensação",
  "/estoque": "Estoque",
  "/relatorios": "Relatórios",
  "/usuarios": "Usuários"
};

// Função para controlar o estado do sidebar com o localStorage
export const getStoredSidebarState = () => {
  const storedState = localStorage.getItem('isSidebarOpen');
  return storedState === null ? true : JSON.parse(storedState);
};

export const toggleSidebarState = (isSidebarOpen) => {
  const newState = !isSidebarOpen;
  localStorage.setItem('isSidebarOpen', JSON.stringify(newState));
  return newState;
};