const { db } = require('../utils/dbUtils');

exports.getAjustesEstoque = async (req, res) => {
    try {
        const ajustes = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM Ajuste_Estoque', [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        res.json({ ajustes });
    } catch (error) {
        console.error("Erro ao buscar ajustes de estoque:", error);
        res.status(500).json({ error: "Erro ao buscar ajustes de estoque" });
    }
};

exports.getAjusteEstoqueById = async (req, res) => {
    const { id } = req.params;
    try {
        const ajuste = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM Ajuste_Estoque WHERE ID_Ajuste = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (ajuste) {
            res.json({ ajuste });
        } else {
            res.status(404).json({ error: "Ajuste de estoque não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao buscar ajuste de estoque:", error);
        res.status(500).json({ error: "Erro ao buscar ajuste de estoque" });
    }
};

exports.addAjusteEstoque = async (req, res) => {
    const { ID_Usuario, ID_Lote, TipoAjuste, Quantidade, Local, Justificativa } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('INSERT INTO Ajuste_Estoque (ID_Usuario, ID_Lote, TipoAjuste, Quantidade, Local, Justificativa) VALUES (?, ?, ?, ?, ?, ?)', [ID_Usuario, ID_Lote, TipoAjuste, Quantidade, Local, Justificativa], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            });
        });

        res.status(201).json({ id: result.id });
    } catch (error) {
        console.error("Erro ao adicionar ajuste de estoque:", error);
        res.status(500).json({ error: "Erro ao adicionar ajuste de estoque" });
    }
};

exports.updateAjusteEstoque = async (req, res) => {
    const { id } = req.params;
    const { ID_Usuario, ID_Lote, TipoAjuste, Quantidade, Local, Justificativa } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('UPDATE Ajuste_Estoque SET ID_Usuario = ?, ID_Lote = ?, TipoAjuste = ?, Quantidade = ?, Local = ?, Justificativa = ? WHERE ID_Ajuste = ?', [ID_Usuario, ID_Lote, TipoAjuste, Quantidade, Local, Justificativa, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes > 0) {
            res.json({ message: "Ajuste de estoque atualizado com sucesso" });
        } else {
            res.status(404).json({ error: "Ajuste de estoque não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao atualizar ajuste de estoque:", error);
        res.status(500).json({ error: "Erro ao atualizar ajuste de estoque" });
    }
};

exports.deleteAjusteEstoque = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('DELETE FROM Ajuste_Estoque WHERE ID_Ajuste = ?', [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes > 0) {
            res.json({ message: "Ajuste de estoque deletado com sucesso" });
        } else {
            res.status(404).json({ error: "Ajuste de estoque não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar ajuste de estoque:", error);
        res.status(500).json({ error: "Erro ao deletar ajuste de estoque" });
    }
};
