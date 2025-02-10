const { db } = require('../utils/dbUtils');

exports.getEstoques = async (req, res) => {
    try {
        const estoques = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM Estoque', [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        res.json({ estoques });
    } catch (error) {
        console.error("Erro ao buscar estoques:", error);
        res.status(500).json({ error: "Erro ao buscar estoques" });
    }
};

exports.getEstoqueById = async (req, res) => {
    const { id } = req.params;
    try {
        const estoque = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM Estoque WHERE ID_Estoque = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (estoque) {
            res.json({ estoque });
        } else {
            res.status(404).json({ error: "Estoque não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao buscar estoque:", error);
        res.status(500).json({ error: "Erro ao buscar estoque" });
    }
};

exports.addEstoque = async (req, res) => {
    const { Nome, ID_Lote, Local } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO Estoque (ID_Lote, QuantidadeAtual, Local, Nome) VALUES (?, 0, ?, ?)",
                [ID_Lote, Local, Nome],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ id: this.lastID });
                    }
                }
            );
        });

        res.status(201).json({ id: result.id });
    } catch (error) {
        console.error("Erro ao adicionar estoque:", error);
        res.status(500).json({ error: "Erro ao adicionar estoque" });
    }
};



exports.updateEstoque = async (req, res) => {
    const { id } = req.params;
    const { ID_Lote, QuantidadeAtual, Local } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('UPDATE Estoque SET ID_Lote = ?, QuantidadeAtual = ?, Local = ? WHERE ID_Estoque = ?', [ID_Lote, QuantidadeAtual, Local, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes > 0) {
            res.json({ message: "Estoque atualizado com sucesso" });
        } else {
            res.status(404).json({ error: "Estoque não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao atualizar estoque:", error);
        res.status(500).json({ error: "Erro ao atualizar estoque" });
    }
};

exports.deleteEstoque = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('DELETE FROM Estoque WHERE ID_Estoque = ?', [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes > 0) {
            res.json({ message: "Estoque deletado com sucesso" });
        } else {
            res.status(404).json({ error: "Estoque não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar estoque:", error);
        res.status(500).json({ error: "Erro ao deletar estoque" });
    }
};

exports.updateQuantidadeEstoque = async (req, res) => {
    const { id } = req.params;
    const { quantidade } = req.body;

    try {
        const result = await new Promise((resolve, reject) => {
            db.run(
                "UPDATE Estoque SET QuantidadeAtual = QuantidadeAtual + ? WHERE ID_Estoque = ?",
                [quantidade, id],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ changes: this.changes });
                    }
                }
            );
        });

        if (result.changes > 0) {
            res.json({ message: "Quantidade atualizada com sucesso" });
        } else {
            res.status(404).json({ error: "Estoque não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao atualizar estoque:", error);
        res.status(500).json({ error: "Erro ao atualizar estoque" });
    }
};
