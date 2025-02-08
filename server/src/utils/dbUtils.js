const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../data/GestFarma.db');
const { atualizarSenhasComHash } = require('./passwordUtils');

// Conexão com o banco de dados
const connectDB = () => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:', err.message);
                reject(err);
            } else {
                console.log('Conectado ao banco de dados SQLite.');
                resolve(db);
            }
        });
    });
};

// Função para executar scripts SQL
const executeSQLFromFile = (db, filePath) => {
    return new Promise((resolve, reject) => {
        const sql = fs.readFileSync(filePath, 'utf8');
        db.exec(sql, (err) => {
            if (err) {
                console.error(`Erro ao executar script ${filePath}:`, err.message);
                reject(err);
            } else {
                console.log(`Script ${filePath} executado com sucesso.`);
                resolve();
            }
        });
    });
};

// Verifica se o banco já existe
const dbStart = async () => {
    try {
        const dbExists = fs.existsSync(dbPath);
        const database = await connectDB();

        if (!dbExists) {
            console.log('Criando estrutura do banco de dados...');
            await executeSQLFromFile(database, path.join(__dirname, '../scripts/init.sql'));
            console.log('Banco de dados alimentado.');
            await atualizarSenhasComHash(database);
            console.log('Senhas criptografadas.');
        } else {
            console.log('Banco de dados já existe. Ignorando inicialização.');
        }

        return database;
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
    }
};

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    }
});

module.exports = { dbStart, connectDB, db };