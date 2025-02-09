const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { dbStart } = require('./src/utils/dbUtils');
const { login, registrar } = require('./src/controllers/authController');
const { getDashboardData } = require('./src/controllers/dashboardController');
const pacientesRoutes = require('./src/routes/pacientes');
const medicamentosRoutes = require('./src/routes/medicamentos');
const lotesRoutes = require('./src/routes/lote');
const dispensacaoRoutes = require('./src/routes/dispensacao');
const { getDispensacaoData } = require('./src/controllers/dispensacaoController');

// Inicializa o app
const app = express();

// Middleware
if (process.env.NODE_ENV !== 'production') {
    const cors = require('cors');
    app.use(cors());
}

app.use(bodyParser.json());

// Inicializa o banco de dados
dbStart().then((db) => {
    if (!db) {
        console.error('Falha ao conectar ao banco de dados. Encerrando servidor.');
        process.exit(1);
    }

    // Rotas
    app.post('/api/login', login);
    app.post('/api/registrar', registrar);
    app.get('/api/dashboard', getDashboardData);
    app.use('/api/pacientes', pacientesRoutes);
    app.use('/api/medicamentos', medicamentosRoutes);
    app.use('/api/lotes', lotesRoutes);
    app.use('/api/dispensacoes', dispensacaoRoutes);
    app.use('/api/dispensacoesTabela', getDispensacaoData);

    // Servir arquivos do React
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    });

    // Inicia o servidor
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch((err) => {
    console.error('Erro ao iniciar servidor:', err);
});
