const bcrypt = require('bcryptjs');

// Função para atualizar senhas com hash
const atualizarSenhasComHash = async (db) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            db.all('SELECT ID_Usuario, Senha FROM Usuario', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        for (const row of rows) {
            if (!row.Senha || typeof row.Senha !== "string" || row.Senha.trim() === "") {
                continue;
            }

            if (!row.Senha.startsWith('$2b$')) {
                const hash = await bcrypt.hash(row.Senha, 10);
                await new Promise((resolve, reject) => {
                    db.run('UPDATE Usuario SET Senha = ? WHERE ID_Usuario = ?', [hash, row.ID_Usuario], (err) => {  
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
        }
    } catch (err) {
        console.error('Erro ao atualizar senhas:', err);
    }
};

module.exports = { atualizarSenhasComHash };