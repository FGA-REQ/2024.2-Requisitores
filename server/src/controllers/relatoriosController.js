const { db } = require('../utils/dbUtils');

exports.getInventoryReport = async (req, res) => {
    try {
        // Consulta para estatísticas gerais do estoque
        const consultaGeral = `
            SELECT 
                (SELECT COUNT(*) FROM Medicamento) AS totalMedicamentos,
                (SELECT COUNT(*) FROM Medicamento WHERE ControleEspecial = 1) AS medicamentosControlados,
                (SELECT COUNT(DISTINCT m.ID_Medicamento) 
                 FROM Medicamento m
                 INNER JOIN Lote l ON m.ID_Medicamento = l.ID_Medicamento
                 INNER JOIN Estoque e ON l.ID_Lote = e.ID_Lote
                 WHERE e.QuantidadeAtual <= m.QuantidadeMinima) AS medicamentosBaixoEstoque,
                (SELECT SUM(e.QuantidadeAtual)
                 FROM Estoque e) AS valorTotalEstoque
        `;

        // Consulta para as 5 principais fabricantes de medicamentos
        const consultaFabricante = `
            SELECT 
                Fabricante AS name,
                COUNT(*) AS quantidade
            FROM Medicamento
            GROUP BY Fabricante
            ORDER BY quantidade DESC
            LIMIT 5
        `;

        // Consulta para validade dos lotes ativos
        const consultaValidade = `
            SELECT 
                CASE 
                    WHEN julianday(Validade) - julianday('now') <= 90 THEN '< 3 meses'
                    WHEN julianday(Validade) - julianday('now') <= 180 THEN '3-6 meses'
                    WHEN julianday(Validade) - julianday('now') <= 365 THEN '6-12 meses'
                    ELSE '> 12 meses'
                END AS name,
                COUNT(*) AS value
            FROM Lote
            WHERE Status = 'Ativo'
            GROUP BY 
                CASE 
                    WHEN julianday(Validade) - julianday('now') <= 90 THEN '< 3 meses'
                    WHEN julianday(Validade) - julianday('now') <= 180 THEN '3-6 meses'
                    WHEN julianday(Validade) - julianday('now') <= 365 THEN '6-12 meses'
                    ELSE '> 12 meses'
                END
            ORDER BY 
                CASE name
                    WHEN '< 3 meses' THEN 1
                    WHEN '3-6 meses' THEN 2
                    WHEN '6-12 meses' THEN 3
                    ELSE 4
                END
        `;

        // Consulta para movimentação diária (últimos 6 meses)
        const consultaMovimentacao = `
            SELECT 
                strftime('%d/%m/%Y', DataHora) AS name,
                SUM(CASE WHEN TipoAjuste = 'Entrada' THEN Quantidade ELSE 0 END) AS entradas,
                SUM(CASE WHEN TipoAjuste = 'Saída' THEN Quantidade ELSE 0 END) AS saidas
            FROM Ajuste_Estoque
            WHERE DataHora >= date('now', '-6 months')
            GROUP BY strftime('%d/%m/%Y', DataHora)
            ORDER BY name DESC
            LIMIT 6
        `;

        // Consulta para medicamentos mais dispensados (últimos 6 meses)
        const consultaMedicamentosMaisDispensados = `
            SELECT 
                m.Nome AS name,
                SUM(d.Quantidade) AS quantidade
            FROM Dispensacao d
            INNER JOIN Lote l ON d.ID_Lote = l.ID_Lote
            INNER JOIN Medicamento m ON l.ID_Medicamento = m.ID_Medicamento
            WHERE d.DataHora >= date('now', '-6 months')
            GROUP BY m.Nome
            ORDER BY quantidade DESC
            LIMIT 5
        `;

        // Consulta para pacientes com mais dispensações (últimos 6 meses)
        const consultaPacientesMaisDispensacoes = `
            SELECT 
                p.Nome AS name,
                COUNT(d.ID_Dispensacao) AS quantidade
            FROM Dispensacao d
            INNER JOIN Paciente p ON d.ID_Paciente = p.ID_Paciente
            WHERE d.DataHora >= date('now', '-6 months')
            GROUP BY p.Nome
            ORDER BY quantidade DESC
            LIMIT 5
        `;

        // Consulta para usuários que mais realizaram dispensações (últimos 6 meses)
        const consultaUsuariosMaisDispensacoes = `
            SELECT 
                u.Nome AS name,
                COUNT(d.ID_Dispensacao) AS quantidade
            FROM Dispensacao d
            INNER JOIN Usuario u ON d.ID_Usuario = u.ID_Usuario
            WHERE d.DataHora >= date('now', '-6 months')
            GROUP BY u.Nome
            ORDER BY quantidade DESC
            LIMIT 5
        `;

        // Execução das consultas
        const dadosGeral = await new Promise((resolve, reject) => {
            db.get(consultaGeral, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        const dadosFabricante = await new Promise((resolve, reject) => {
            db.all(consultaFabricante, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        const dadosValidade = await new Promise((resolve, reject) => {
            db.all(consultaValidade, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        const dadosMovimentacao = await new Promise((resolve, reject) => {
            db.all(consultaMovimentacao, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    // Inverte a ordem para exibir do mais antigo para o mais recente
                    resolve(rows.reverse());
                }
            });
        });

        const dadosMedicamentosMaisDispensados = await new Promise((resolve, reject) => {
            db.all(consultaMedicamentosMaisDispensados, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        const dadosPacientesMaisDispensacoes = await new Promise((resolve, reject) => {
            db.all(consultaPacientesMaisDispensacoes, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        const dadosUsuariosMaisDispensacoes = await new Promise((resolve, reject) => {
            db.all(consultaUsuariosMaisDispensacoes, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        // Formatação da resposta para o frontend
        res.json({
            geral: {
                totalMedicamentos: dadosGeral.totalMedicamentos || 0,
                medicamentosControlados: dadosGeral.medicamentosControlados || 0,
                medicamentosBaixoEstoque: dadosGeral.medicamentosBaixoEstoque || 0,
                valorTotalEstoque: dadosGeral.valorTotalEstoque || 0
            },
            estoqueFabricante: dadosFabricante,
            validade: dadosValidade,
            movimentacaoMensal: dadosMovimentacao,
            medicamentosMaisDispensados: dadosMedicamentosMaisDispensados,
            pacientesMaisDispensacoes: dadosPacientesMaisDispensacoes,
            usuariosMaisDispensacoes: dadosUsuariosMaisDispensacoes
        });

    } catch (error) {
        console.error("Erro ao buscar dados do relatório de estoque:", error);
        res.status(500).json({ error: "Erro ao buscar dados do relatório de estoque" });
    }
};
