const { db } = require('../utils/dbUtils');

exports.getLotes = async (req, res) => {
    try {
        const lotes = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM Lote', [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        res.json({ lotes });
    } catch (error) {
        console.error("Erro ao buscar lotes:", error);
        res.status(500).json({ error: "Erro ao buscar lotes" });
    }
};

exports.getLoteById = async (req, res) => {
    const { id } = req.params;
    try {
        const lote = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM Lote WHERE ID_Lote = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (lote) {
            res.json({ lote });
        } else {
            res.status(404).json({ error: "Lote não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao buscar lote:", error);
        res.status(500).json({ error: "Erro ao buscar lote" });
    }
};

exports.addLote = async (req, res) => {
    const { ID_Medicamento, CodigoLote, Validade, Status } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('INSERT INTO Lote (ID_Medicamento, CodigoLote, Validade, Status) VALUES (?, ?, ?, ?)', [ID_Medicamento, CodigoLote, Validade, Status], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            });
        });

        res.status(201).json({ id: result.id });
    } catch (error) {
        console.error("Erro ao adicionar lote:", error);
        res.status(500).json({ error: "Erro ao adicionar lote" });
    }
};

exports.updateLote = async (req, res) => {
    const { id } = req.params;
    const { ID_Medicamento, CodigoLote, Validade, Status } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('UPDATE Lote SET ID_Medicamento = ?, CodigoLote = ?, Validade = ?, Status = ? WHERE ID_Lote = ?', [ID_Medicamento, CodigoLote, Validade, Status, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes > 0) {
            res.json({ message: "Lote atualizado com sucesso" });
        } else {
            res.status(404).json({ error: "Lote não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao atualizar lote:", error);
        res.status(500).json({ error: "Erro ao atualizar lote" });
    }
};

exports.deleteLote = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('DELETE FROM Lote WHERE ID_Lote = ?', [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes > 0) {
            res.json({ message: "Lote deletado com sucesso" });
        } else {
            res.status(404).json({ error: "Lote não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar lote:", error);
        res.status(500).json({ error: "Erro ao deletar lote" });
    }
};