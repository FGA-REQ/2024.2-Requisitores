const { db } = require('../utils/dbUtils');

exports.getPacientes = async (req, res) => {
    try {
        const pacientes = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM Paciente', [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        res.json({ pacientes });
    } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
        res.status(500).json({ error: "Erro ao buscar pacientes" });
    }
};

exports.getPacienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM Paciente WHERE ID_Paciente = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (paciente) {
            res.json({ paciente });
        } else {
            res.status(404).json({ error: "Paciente não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao buscar paciente:", error);
        res.status(500).json({ error: "Erro ao buscar paciente" });
    }
};

exports.addPaciente = async (req, res) => {
    const { Nome, Prontuario } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('INSERT INTO Paciente (Nome, Prontuario) VALUES (?, ?)', [Nome, Prontuario], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            });
        });

        res.status(201).json({ id: result.id });
    } catch (error) {
        console.error("Erro ao adicionar paciente:", error);
        res.status(500).json({ error: "Erro ao adicionar paciente" });
    }
};

exports.updatePaciente = async (req, res) => {
    const { id } = req.params;
    const { Nome, Prontuario } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('UPDATE Paciente SET Nome = ?, Prontuario = ? WHERE ID_Paciente = ?', [Nome, Prontuario, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes > 0) {
            res.json({ message: "Paciente atualizado com sucesso" });
        } else {
            res.status(404).json({ error: "Paciente não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao atualizar paciente:", error);
        res.status(500).json({ error: "Erro ao atualizar paciente" });
    }
};

exports.deletePaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('DELETE FROM Paciente WHERE ID_Paciente = ?', [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes > 0) {
            res.json({ message: "Paciente deletado com sucesso" });
        } else {
            res.status(404).json({ error: "Paciente não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar paciente:", error);
        res.status(500).json({ error: "Erro ao deletar paciente" });
    }
};