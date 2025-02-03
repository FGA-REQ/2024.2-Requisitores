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
    return localStorage.getItem("sidebarState") === "open";
  };
  
  export const toggleSidebarState = (isSidebarOpen) => {
    const newState = !isSidebarOpen;
    localStorage.setItem("sidebarState", newState ? "open" : "closed"); // Salva no localStorage
    return newState;
  };