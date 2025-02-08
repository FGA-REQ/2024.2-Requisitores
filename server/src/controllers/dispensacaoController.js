const { db } = require('../utils/dbUtils');

exports.getDispensacaoData = async (req, res) => {
    try {
        // Consulta para dispensação por dia (exemplo)
        const queryDispensacao = `
            SELECT 
                p.Nome AS "Paciente",
                m.Nome AS "Medicamento",
                its.QuantidadeSolicitada AS "Prescrito",
                COALESCE(SUM(e.QuantidadeAtual), 0) AS "Estoque"
            FROM Dispensacao d
            LEFT JOIN Lote l ON d.ID_Lote = l.ID_Lote
            LEFT JOIN Medicamento m ON l.ID_Medicamento = m.ID_Medicamento
            LEFT JOIN Estoque e ON l.ID_Lote = e.ID_Lote
            LEFT JOIN Paciente p ON d.ID_Paciente = p.ID_Paciente
            LEFT JOIN Item_Solicitado its ON m.ID_Medicamento = its.ID_Medicamento
            GROUP BY p.Nome, m.Nome, its.QuantidadeSolicitada;
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
            dispensacao: dispensacao
        });

    } catch (error) {
        console.error("Erro ao buscar dados do dispensação:", error);
        res.status(500).json({ error: "Erro ao buscar dados do dispensação"});
    }
};