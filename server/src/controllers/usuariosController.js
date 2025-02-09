const { db } = require('../utils/dbUtils');

exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM Usuario', [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        res.json({ usuarios });
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
};

exports.getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM Usuario WHERE ID_Usuario = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (usuario) {
            res.json({ usuario });
        } else {
            res.status(404).json({ error: "Usuário não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: "Erro ao buscar usuário" });
    }
};

exports.addUsuario = async (req, res) => {
    const { Nome, Login, Senha, Perfil } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('INSERT INTO Usuario (Nome, Login, Senha, Perfil) VALUES (?, ?, ?, ?)', [Nome, Login, Senha, Perfil], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            });
        });

        res.status(201).json({ id: result.id });
    } catch (error) {
        console.error("Erro ao adicionar usuário:", error);
        res.status(500).json({ error: "Erro ao adicionar usuário" });
    }
};

exports.updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { Nome, Login, Senha, Perfil } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('UPDATE Usuario SET Nome = ?, Login = ?, Senha = ?, Perfil = ? WHERE ID_Usuario = ?', [Nome, Login, Senha, Perfil, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes > 0) {
            res.json({ message: "Usuário atualizado com sucesso" });
        } else {
            res.status(404).json({ error: "Usuário não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
};

exports.deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run('DELETE FROM Usuario WHERE ID_Usuario = ?', [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes > 0) {
            res.json({ message: "Usuário deletado com sucesso" });
        } else {
            res.status(404).json({ error: "Usuário não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ error: "Erro ao deletar usuário" });
    }
};
