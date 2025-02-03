const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { db, executeSQLFromFile } = require('./src/utils/dbUtils');
const { atualizarSenhasComHash } = require('./src/utils/passwordUtils');
const { autenticar } = require('./src/middlewares/authMiddleware');
const { login, registrar } = require('./src/controllers/authController');

// Inicializa o app
const app = express();

// Middleware
if (process.env.NODE_ENV !== 'production') {
    const cors = require('cors');
    app.use(cors());
}
app.use(bodyParser.json());

// Conexão com o banco de dados e execução de scripts
const scriptsPath = path.join(__dirname, 'src/scripts');
executeSQLFromFile(path.join(scriptsPath, 'init.sql'));

// Atualiza senhas no banco
atualizarSenhasComHash(db);

// Servindo o frontend do React
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Rota de login
app.post('/api/login', login);

// Cadastro de usuário
app.post('/api/registrar', registrar);

// Inicia o servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});