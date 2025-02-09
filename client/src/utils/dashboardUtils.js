export const fetchDashboardData = async (setDashboardData, setLoading) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/dashboard', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            window.location.href = "/login";
            return;
        }
        const data = await response.json();
        setDashboardData(data);
        setLoading(false);
    } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
        setLoading(false);
        window.location.href = "/login";
    }
};

export const fetchUsuarioLogado = async (setUsuarioLogado) => {
    try {
        const response = await fetch('/api/usuarioLogado');
        const data = await response.json();
        setUsuarioLogado(data.usuario);
    } catch (error) {
        console.error("Erro ao buscar usuário logado:", error);
    }
};

export const formatDataForBarChart = (data) => {
    const labels = data.map(item => item.fabricante);
    const datasets = [{
        label: 'Número de medicamentos por fabricante',
        data: data.map(item => item.quantidade),
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
    }];

    return { labels, datasets };
};

export const formatDataForPieChart = (data) => {
    if (!data || data.length === 0) return null;

    const labels = data.map(item => item.controle ? 'Controlado' : 'Não controlado');
    const datasets = [{
        label: 'Porcentagem de medicamentos por tipo de controle',
        data: data.map(item => item.quantidade),
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
    }];

    return { labels, datasets };
};

export const formatDataForLineChart = (data) => {
    if (!data || data.length === 0) return null;

    const labels = data.map(item => item.data);
    const datasets = [{
        label: 'Quantidade de medicamentos dispensados por dia',
        data: data.map(item => item.quantidade),
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        fill: false,
    }];

    return { labels, datasets };
};

export const formatDataForDoughnutChart = (data) => ({
    labels: data.map(item => item.nome),
    datasets: [{
        data: data.map(item => item.quantidade),
        backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
    }]
});
