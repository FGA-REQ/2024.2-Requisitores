const { db } = require('../utils/dbUtils');

exports.getMedicamentosData = async (req, res) => {
    try {
        // Consulta para dispensação por dia (exemplo)
        const queryDispensacao = `
            SELECT DATE(DataHora) AS data, SUM(Quantidade) AS quantidade
            FROM Dispensacao
            GROUP BY data
        `;a

        // Consulta para dispensação por dia (exemplo)
        const queryMedicamento = `
            SELECT DATE(DataHora) AS data, SUM(Quantidade) AS quantidade
            FROM Dispensacao
            GROUP BY data
        `;

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