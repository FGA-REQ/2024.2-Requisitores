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
                (SELECT SUM(e.QuantidadeAtual * m.ValorUnitario)
                 FROM Medicamento m
                 INNER JOIN Lote l ON m.ID_Medicamento = l.ID_Medicamento
                 INNER JOIN Estoque e ON l.ID_Lote = e.ID_Lote) AS valorTotalEstoque
        `;

        // Consulta para as 5 principais categorias de medicamentos
        const consultaCategoria = `
            SELECT 
                Categoria AS name,
                COUNT(*) AS quantidade
            FROM Medicamento
            GROUP BY Categoria
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

        // Consulta para movimentação mensal (últimos 6 meses)
        const consultaMovimentacao = `
            SELECT 
                strftime('%Y-%m', DataHora) AS name,
                SUM(CASE WHEN TipoMovimento = 'Entrada' THEN Quantidade ELSE 0 END) AS entradas,
                SUM(CASE WHEN TipoMovimento = 'Saida' THEN Quantidade ELSE 0 END) AS saidas
            FROM MovimentacaoEstoque
            WHERE DataHora >= date('now', '-6 months')
            GROUP BY strftime('%Y-%m', DataHora)
            ORDER BY name DESC
            LIMIT 6
        `;

        // Consulta para heatmap da movimentação (dias úteis e horário comercial)
        const consultaHeatMap = `
            SELECT 
                strftime('%w', DataHora) AS dia,
                strftime('%H:00', DataHora) AS hora,
                COUNT(*) AS quantidade
            FROM MovimentacaoEstoque
            WHERE 
                strftime('%w', DataHora) BETWEEN 1 AND 5
                AND strftime('%H', DataHora) BETWEEN 8 AND 16
            GROUP BY dia, hora
            ORDER BY dia, hora
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

        const dadosCategoria = await new Promise((resolve, reject) => {
            db.all(consultaCategoria, (err, rows) => {
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

        // Caso seja necessário utilizar o heatmap, executar a consulta abaixo:
        // const dadosHeatMap = await new Promise((resolve, reject) => {
        //     db.all(consultaHeatMap, (err, rows) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(rows);
        //         }
        //     });
        // });

        // Formatação da resposta para o frontend
        res.json({
            geral: {
                totalMedicamentos: dadosGeral.totalMedicamentos || 0,
                medicamentosControlados: dadosGeral.medicamentosControlados || 0,
                medicamentosBaixoEstoque: dadosGeral.medicamentosBaixoEstoque || 0,
                valorTotalEstoque: dadosGeral.valorTotalEstoque || 0
            },
            estoqueCategoria: dadosCategoria,
            validade: dadosValidade,
            movimentacaoMensal: dadosMovimentacao
            // heatMap: dadosHeatMap // descomente caso precise incluir os dados do heatmap
        });

    } catch (error) {
        console.error("Erro ao buscar dados do relatório de estoque:", error);
        res.status(500).json({ error: "Erro ao buscar dados do relatório de estoque" });
    }
};
