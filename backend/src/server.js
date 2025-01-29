const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
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

    // Executa os scripts na inicialização
    const scriptsPath = path.join(__dirname, 'scripts');
    executeSQLFromFile(path.join(scriptsPath, 'init.sql'));

    // Rotas
    app.get('/', (req, res) => {
        res.send('Servidor funcionando!');
    });

    app.get('/dadosMedicamentos', (req, res) => {
        db.all('SELECT * FROM Medicamento', [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        });
    });

    // Retorne o banco de dados para caso precise ser usado no futuro
    return db;
};

const express = require('express');
const app = express();
const medicamentosRoutes = require('./routes/medicamentos');

app.use(express.json()); // Para lidar com JSON no corpo das requisições
app.use('/api', medicamentosRoutes); // Prefixa as rotas com "/api"

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});

