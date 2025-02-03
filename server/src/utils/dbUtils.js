const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Conexão com o banco de dados
const db = new sqlite3.Database('./GestFarma.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Função para executar scripts SQL
const executeSQLFromFile = (filePath) => {
    const sql = fs.readFileSync(filePath, 'utf8');
    db.exec(sql, (err) => {
        if (err) {
            console.error(`Erro ao executar script ${filePath}:`, err.message);
        } else {
            console.log(`Script ${filePath} executado com sucesso.`);
        }
    });
};

module.exports = { db, executeSQLFromFile };