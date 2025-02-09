const { db } = require('../utils/dbUtils');

exports.getMedicamentos = async (req, res) => {
    try {
        const medicamentos = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM Medicamento', [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        res.json({ medicamentos });
    } catch (error) {
        console.error("Erro ao buscar medicamentos:", error);
        res.status(500).json({ error: "Erro ao buscar medicamentos" });
    }
};

exports.getMedicamentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const medicamento = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM Medicamento WHERE ID_Medicamento = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (medicamento) {
            res.json({ medicamento });
        } else {
            res.status(404).json({ error: "Medicamento não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao buscar medicamento:", error);
        res.status(500).json({ error: "Erro ao buscar medicamento" });
    }
};

exports.addMedicamento = async (req, res) => {
    const { Nome, Codigo, Descricao, Fabricante, ControleEspecial, QuantidadeMinima, QuantidadeMaxima } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('INSERT INTO Medicamento (Nome, Codigo, Descricao, Fabricante, ControleEspecial, QuantidadeMinima, QuantidadeMaxima) VALUES (?, ?, ?, ?, ?, ?, ?)', [Nome, Codigo, Descricao, Fabricante, ControleEspecial, QuantidadeMinima, QuantidadeMaxima], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            });
        });

        res.status(201).json({ id: result.id });
    } catch (error) {
        console.error("Erro ao adicionar medicamento:", error);
        res.status(500).json({ error: "Erro ao adicionar medicamento" });
    }
};

exports.updateMedicamento = async (req, res) => {
    const { id } = req.params;
    const { Nome, Codigo, Descricao, Fabricante, ControleEspecial, QuantidadeMinima, QuantidadeMaxima } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('UPDATE Medicamento SET Nome = ?, Codigo = ?, Descricao = ?, Fabricante = ?, ControleEspecial = ?, QuantidadeMinima = ?, QuantidadeMaxima = ? WHERE ID_Medicamento = ?', [Nome, Codigo, Descricao, Fabricante, ControleEspecial, QuantidadeMinima, QuantidadeMaxima, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes > 0) {
            res.json({ message: "Medicamento atualizado com sucesso" });
        } else {
            res.status(404).json({ error: "Medicamento não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao atualizar medicamento:", error);
        res.status(500).json({ error: "Erro ao atualizar medicamento" });
    }
};

exports.deleteMedicamento = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('DELETE FROM Medicamento WHERE ID_Medicamento = ?', [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes > 0) {
            res.json({ message: "Medicamento deletado com sucesso" });
        } else {
            res.status(404).json({ error: "Medicamento não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar medicamento:", error);
        res.status(500).json({ error: "Erro ao deletar medicamento" });
    }
};