const { db } = require('../utils/dbUtils');

exports.getDashboardData = async (req, res) => {
    try {
        // Consulta para o total de medicamentos
        const queryTotal = `SELECT COUNT(*) AS total FROM Medicamento`;

        // Consulta para o total de saídas (quantidade total dispensada)
        const querySaidas = `SELECT SUM(Quantidade) AS total_saidas FROM Dispensacao`;

        // Consulta para medicamentos com estoque baixo
        const queryAcabando = `
            SELECT COUNT(DISTINCT m.ID_Medicamento) AS acabando
            FROM Medicamento m
            INNER JOIN Lote l ON m.ID_Medicamento = l.ID_Medicamento
            INNER JOIN Estoque e ON l.ID_Lote = e.ID_Lote
            WHERE e.QuantidadeAtual <= m.QuantidadeMinima
        `;

        // Consulta para medicamentos próximos do vencimento (30 dias)
        const queryVencendo = `
            SELECT COUNT(DISTINCT m.ID_Medicamento) AS vencendo
            FROM Medicamento m
            INNER JOIN Lote l ON m.ID_Medicamento = l.ID_Medicamento
            WHERE l.Validade <= DATE('now', '+30 days') AND l.Status = 'Ativo'
        `;

        const queryFabricante = `
            SELECT Fabricante AS fabricante, COUNT(*) AS quantidade
            FROM Medicamento
            GROUP BY Fabricante
        `;

        // Consulta para medicamentos por tipo de controle
        const queryControle = `
            SELECT ControleEspecial AS controle, COUNT(*) AS quantidade
            FROM Medicamento
            GROUP BY ControleEspecial
        `;

        // Consulta para dispensação por dia (exemplo)
        const queryDispensacao = `
            SELECT DATE(DataHora) AS data, SUM(Quantidade) AS quantidade
            FROM Dispensacao
            GROUP BY data
        `;

        const totalMedicamentos = await new Promise((resolve, reject) => {
            db.get(queryTotal, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        const totalSaidas = await new Promise((resolve, reject) => {
            db.get(querySaidas, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        const acabando = await new Promise((resolve, reject) => {
            db.get(queryAcabando, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        const vencendo = await new Promise((resolve, reject) => {
            db.get(queryVencendo, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        const fabricante = await new Promise((resolve, reject) => {
            db.all(queryFabricante, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        const controle = await new Promise((resolve, reject) => {
            db.all(queryControle, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        const dispensacao = await new Promise((resolve, reject) => {
            db.all(queryDispensacao, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        res.json({
            geral: { // Dados gerais do dashboard
                totalMedicamentos: totalMedicamentos.total || 0,
                totalSaidas: totalSaidas.total_saidas || 0,
                acabando: acabando.acabando || 0,
                vencendo: vencendo.vencendo || 0
            },
            fabricante: fabricante, // Dados para o gráfico de barras
            controle: controle, // Dados para o gráfico de pizza
            dispensacao: dispensacao // Dados para o gráfico de linhas
        });

    } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
        res.status(500).json({ error: "Erro ao buscar dados do dashboard" });
    }
};