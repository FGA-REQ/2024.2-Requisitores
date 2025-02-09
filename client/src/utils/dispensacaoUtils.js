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
        const medicamentosOrdenados = ordenarMedicamentosPorValidade(data.medicamentos || []);
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
    if (!modalData) return;

    try {
        const token = localStorage.getItem('token');
        // Atualiza a quantidade no estoque
        const responseEstoque = await fetch(`/api/estoque/${modalData.ID_Lote}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ ID_Lote: modalData.ID_Lote, QuantidadeAtual: modalData.Estoque - modalData.Prescrito, Local: modalData.Local }),
        });

        if (!responseEstoque.ok) {
            console.error("Erro ao atualizar estoque:", responseEstoque.status);
            return;
        }

        // Adiciona o ajuste no estoque
        const responseAjuste = await fetch('/api/ajuste_estoque', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                ID_Usuario: usuarioLogado.ID_Usuario,
                ID_Lote: modalData.ID_Lote,
                TipoAjuste: 'Saída',
                Quantidade: modalData.Prescrito,
                Local: modalData.Local,
                Justificativa: 'Dispensação de medicamento'
            }),
        });

        if (!responseAjuste.ok) {
            console.error("Erro ao adicionar ajuste de estoque:", responseAjuste.status);
            return;
        }

        // Remove a dispensação realizada
        const responseDispensacao = await fetch(`/api/dispensacoes/${modalData.idMedicamento}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (responseDispensacao.ok) {
            const data = await responseDispensacao.json();
            setDispensacao(dadosDispensacao.filter(d => d.idMedicamento !== modalData.idMedicamento));
            setShowModal(false);
        } else {
            console.error("Erro ao remover dispensação:", responseDispensacao.status);
        }
    } catch (error) {
        console.error("Erro ao dispensar medicamento:", error);
    }
};
