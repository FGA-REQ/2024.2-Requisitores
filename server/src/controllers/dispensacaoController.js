const { db } = require('../utils/dbUtils');

exports.getDispensacaoData = async (req, res) => {
    try {
        const queryDispensacao = `
            SELECT 
                p.Nome AS "Paciente",
                m.Nome AS "Medicamento",
                its.QuantidadeSolicitada AS "Prescrito",
                COALESCE(SUM(CASE WHEN l.Status = 'Ativo' THEN e.QuantidadeAtual ELSE 0 END), 0) AS "Estoque",
                m.ID_Medicamento AS "idMedicamento",
                e.Local AS "Local",
                p.Prontuario AS "Prontuario",
                strftime('%d/%m/%Y', l.Validade) AS "Validade"
            FROM Dispensacao d
            LEFT JOIN Lote l ON d.ID_Lote = l.ID_Lote
            LEFT JOIN Medicamento m ON l.ID_Medicamento = m.ID_Medicamento
            LEFT JOIN Estoque e ON l.ID_Lote = e.ID_Lote
            LEFT JOIN Paciente p ON d.ID_Paciente = p.ID_Paciente
            LEFT JOIN Item_Solicitado its ON m.ID_Medicamento = its.ID_Medicamento
            -- WHERE Validade >= DATE('now')
            GROUP BY Paciente, Medicamento, ID_Dispensacao
            ORDER BY Validade desc;
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
        res.status(500).json({ error: "Erro ao buscar dados do dispensação" });
    }
};

exports.getDispensacoes = async (req, res) => {
    try {
        const dispensacoes = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM Dispensacao', [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        res.json({ dispensacoes });
    } catch (error) {
        console.error("Erro ao buscar dispensações:", error);
        res.status(500).json({ error: "Erro ao buscar dispensações" });
    }
};

exports.getDispensacaoById = async (req, res) => {
    const { id } = req.params;
    try {
        const dispensacao = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM Dispensacao WHERE ID_Dispensacao = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (dispensacao) {
            res.json({ dispensacao });
        } else {
            res.status(404).json({ error: "Dispensação não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao buscar dispensação:", error);
        res.status(500).json({ error: "Erro ao buscar dispensação" });
    }
};

exports.addDispensacao = async (req, res) => {
    const { ID_Lote, ID_Paciente, ID_Usuario, Quantidade } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('INSERT INTO Dispensacao (ID_Lote, ID_Paciente, ID_Usuario, Quantidade) VALUES (?, ?, ?, ?)', [ID_Lote, ID_Paciente, ID_Usuario, Quantidade], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            });
        });

        res.status(201).json({ id: result.id });
    } catch (error) {
        console.error("Erro ao adicionar dispensação:", error);
        res.status(500).json({ error: "Erro ao adicionar dispensação" });
    }
};

exports.updateDispensacao = async (req, res) => {
    const { id } = req.params;
    const { ID_Lote, ID_Paciente, ID_Usuario, Quantidade } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('UPDATE Dispensacao SET ID_Lote = ?, ID_Paciente = ?, ID_Usuario = ?, Quantidade = ? WHERE ID_Dispensacao = ?', [ID_Lote, ID_Paciente, ID_Usuario, Quantidade, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes > 0) {
            res.json({ message: "Dispensação atualizada com sucesso" });
        } else {
            res.status(404).json({ error: "Dispensação não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao atualizar dispensação:", error);
        res.status(500).json({ error: "Erro ao atualizar dispensação" });
    }
};

exports.deleteDispensacao = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('DELETE FROM Dispensacao WHERE ID_Dispensacao = ?', [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes > 0) {
            res.json({ message: "Dispensação deletada com sucesso" });
        } else {
            res.status(404).json({ error: "Dispensação não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao deletar dispensação:", error);
        res.status(500).json({ error: "Erro ao deletar dispensação" });
    }
};

exports.createDispensacao = async (req, res) => {
    const { ID_Lote, ID_Paciente, ID_Usuario, Quantidade } = req.body;
    try {
        await db.run('BEGIN TRANSACTION');

        // Atualiza a quantidade no estoque
        const updateEstoque = await new Promise((resolve, reject) => {
            db.run('UPDATE Estoque SET QuantidadeAtual = QuantidadeAtual - ? WHERE ID_Lote = ?', [Quantidade, ID_Lote], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (updateEstoque.changes === 0) {
            throw new Error('Lote não encontrado ou quantidade insuficiente no estoque');
        }

        // Insere a nova dispensação
        const result = await new Promise((resolve, reject) => {
            db.run('INSERT INTO Dispensacao (ID_Lote, ID_Paciente, ID_Usuario, Quantidade) VALUES (?, ?, ?, ?)', [ID_Lote, ID_Paciente, ID_Usuario, Quantidade], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            });
        });

        await db.run('COMMIT');

        res.status(201).json({ id: result.id });
    } catch (error) {
        await db.run('ROLLBACK');
        console.error("Erro ao criar dispensação:", error);
        res.status(500).json({ error: "Erro ao criar dispensação" });
    }
};