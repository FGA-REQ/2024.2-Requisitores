const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Inicializa o app
const app = express();

// Middleware
if (process.env.NODE_ENV !== 'production') {
    const cors = require('cors');
    app.use(cors());
  }
app.use(bodyParser.json());

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
const scriptsPath = path.join(__dirname, 'src/scripts');
executeSQLFromFile(path.join(scriptsPath, 'init.sql'));

// Rotas do backend
app.get('/api/dadosMedicamentos', (req, res) => {
    res.json({ mensagem: 'API funcionando!' });
});

// Servindo o frontend do React
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get('/login', (req, res) => {
    res.redirect('/login');
});

// Inicia o servidor
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});