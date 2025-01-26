const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

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

// Rota básica de teste
app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});

// Rota para buscar dados
app.get('/dadosMedicamentos', (req, res) => {
    db.all('SELECT * FROM Medicamento', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
