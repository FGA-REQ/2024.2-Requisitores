export const fetchDadosDispensacao = async (setDispensacao, setLoading) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/dispensacoesTabela', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            window.location.href = "/login";
            return;
        }
        const data = await response.json();
        setDispensacao(data.dispensacao || []);
        setLoading(false);
    } catch (error) {
        console.error("Erro ao buscar dados da dispensação:", error);
        setLoading(false);
        window.location.href = "/login";
    }
};

export const fetchPacientes = async (setPacientes) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/pacientes', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            window.location.href = "/login";
            return;
        }
        const data = await response.json();
        setPacientes(data.pacientes || []);
    } catch (error) {
        console.error("Erro ao buscar dados dos Pacientes:", error);
        window.location.href = "/login";
    }
};

export const fetchMedicamentos = async (setMedicamentos) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/medicamentos', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            window.location.href = "/login";
            return;
        }
        const data = await response.json();
        const medicamentosOrdenados = (data.medicamentos || []).sort((a, b) => a.Nome.localeCompare(b.Nome));
        setMedicamentos(medicamentosOrdenados);
    } catch (error) {
        console.error("Erro ao buscar medicamentos:", error);
        window.location.href = "/login";
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

export const ordenarMedicamentosPorValidade = (medicamentos) => {
    return medicamentos.sort((a, b) => {
        const dataA = new Date(a.Validade);
        const dataB = new Date(b.Validade);
        return dataA - dataB;
    });
};

export const filterDispensacao = (search, dadosDispensacao, setFilteredDispensacao, loading) => {
    if (loading) return;

    if (!search) {
        setFilteredDispensacao(dadosDispensacao);
        return;
    }

    const searchTerm = search.toLowerCase();

    const filtered = dadosDispensacao.filter((disp) => {
        const paciente = disp.Paciente ? disp.Paciente.toLowerCase() : "";
        const prontuario = disp.Prontuario ? disp.Prontuario.toLowerCase() : "";
        const medicamento = disp.Medicamento ? disp.Medicamento.toLowerCase() : "";

        return paciente.includes(searchTerm) || prontuario.includes(searchTerm) || medicamento.includes(searchTerm);
    });

    setFilteredDispensacao(filtered);
};

export const handleDispensarConfirm = async (modalData, usuarioLogado, setDispensacao, dadosDispensacao, setShowModal) => {
    if (!modalData || !modalData.idLote) {
        console.error("Dados do lote não encontrados.");
        return;
    }

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/dispensacoes/confirmar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                ID_Dispensacao: modalData.ID_Dispensacao,
                ID_Lote: modalData.idLote,
                Quantidade: modalData.Prescrito,
                ID_Usuario: usuarioLogado.ID_Usuario
            }),
        });

        if (response.ok) {
            const data = await response.json();
            setDispensacao(dadosDispensacao.filter(d => d.ID_Dispensacao !== modalData.ID_Dispensacao));
            setShowModal(false);
        } else {
            console.error("Erro ao concluir dispensação:", response.status);
        }
    } catch (error) {
        console.error("Erro ao concluir dispensação:", error);
    }
};

export const handleNewDispensacaoConfirmUtil = async (modalData2, setDispensacao, dadosDispensacao, setShowModal2) => {
    if (!modalData2) return;

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/dispensacoes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(modalData2),
        });

        if (response.ok) {
            const data = await response.json();
            setDispensacao([...dadosDispensacao, data]);
            setShowModal2(false);
        } else {
            console.error("Erro ao adicionar dispensação:", response.status);
        }
    } catch (error) {
        console.error("Erro ao adicionar dispensação:", error);
    }
};

export const handleDispensarClick = (disp, setModalData, setShowModal) => {
    setModalData(disp);
    setShowModal(true);
};

export const handleNewDispensacaoClick = (usuarioLogado, setModalData2, setShowModal2) => {
    setModalData2({ ID_Usuario: usuarioLogado?.ID_Usuario });
    setShowModal2(true);
};

export const handleDispensarCancel = (setShowModal, setModalData) => {
    setShowModal(false);
    setModalData(null);
};

export const handleDispensarCancel2 = (setShowModal2, setModalData2) => {
    setShowModal2(false);
    setModalData2(null);
};

export const fetchLotesByMedicamento = async (medicamentoId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/lotes?medicamentoId=${medicamentoId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            window.location.href = "/login";
            return;
        }
        const data = await response.json();
        return data.lotes || [];
    } catch (error) {
        console.error("Erro ao buscar lotes do medicamento:", error);
        window.location.href = "/login";
    }
};

export const handleMedicamentoChange = async (e, setModalData2, medicamentos) => {
    const medicamentoId = e.target.value;
    const medicamentoSelecionado = medicamentos.find(m => m.ID_Medicamento === parseInt(medicamentoId));

    if (medicamentoSelecionado) {
        try {

            const token = localStorage.getItem('token');
            const response = await fetch(`/api/lotes?medicamentoId=${medicamentoId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            const lotesFiltrados = data.lotes.filter(lote => lote.ID_Medicamento === parseInt(medicamentoId));

            setModalData2(prevState => ({
                ...prevState,
                ID_Medicamento: medicamentoId,
                lotes: lotesFiltrados,
                ID_Lote: lotesFiltrados.length > 0 ? lotesFiltrados[0].ID_Lote : ''
            }));
        } catch (error) {
            console.error("Erro ao buscar lotes do medicamento:", error);
        }
    }
};


export const handleNewDispensacaoConfirm = async (modalData2, setDispensacao, dadosDispensacao, setShowModal2, setLoading) => {
    if (!modalData2.ID_Paciente || !modalData2.ID_Medicamento || !modalData2.Quantidade || modalData2.Quantidade <= 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }
    await handleNewDispensacaoConfirmUtil(modalData2, setDispensacao, dadosDispensacao, setShowModal2);
    fetchDadosDispensacao(setDispensacao, setLoading);
};