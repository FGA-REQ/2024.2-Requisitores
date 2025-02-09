export const fetchInventoryData = async (setInventoryData) => {
    try {
        const response = await fetch('/api/relatorios/inventario');
        if (!response.ok) {
            throw new Error('Erro ao buscar dados do relatório');
        }
        const data = await response.json();
        setInventoryData(data);
    } catch (error) {
        console.error("Erro ao buscar dados do relatório:", error);
    }
};
