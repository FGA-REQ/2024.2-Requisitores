const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { dbStart } = require('./src/utils/dbUtils');
const { login, registrar, getUsuarioLogado } = require('./src/controllers/authController');
const { getDashboardData } = require('./src/controllers/dashboardController');
const pacientesRoutes = require('./src/routes/pacientes');
const medicamentosRoutes = require('./src/routes/medicamentos');
const lotesRoutes = require('./src/routes/lote');
const dispensacaoRoutes = require('./src/routes/dispensacao');
const usuariosRoutes = require('./src/routes/usuarios');
const estoqueRoutes = require('./src/routes/estoque');
const ajusteEstoqueRoutes = require('./src/routes/ajusteEstoque');
const relatoriosRouter = require('./src/routes/relatorios');
const { getDispensacaoData } = require('./src/controllers/dispensacaoController');
const { authMiddleware, checkRole } = require('./src/middleware/authMiddleware');

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
    app.get('/api/usuarioLogado', authMiddleware, getUsuarioLogado);
    app.get('/api/dashboard', authMiddleware, checkRole(['Administrador', 'Farmacêutico', 'Técnico de Farmácia', 'Auditor']), getDashboardData);
    app.use('/api/pacientes', authMiddleware, checkRole(['Administrador', 'Auditor']), pacientesRoutes);
    app.use('/api/medicamentos', authMiddleware, checkRole(['Administrador', 'Auditor']), medicamentosRoutes);
    app.use('/api/lotes', authMiddleware, checkRole(['Administrador', 'Auditor']), lotesRoutes);
    app.use('/api/dispensacoes', authMiddleware, checkRole(['Administrador', 'Farmacêutico', 'Técnico de Farmácia', 'Auditor']), dispensacaoRoutes);
    app.use('/api/usuarios', authMiddleware, checkRole(['Administrador', 'Auditor']), usuariosRoutes);
    app.use('/api/estoque', authMiddleware, checkRole(['Administrador', 'Farmacêutico', 'Auditor']), estoqueRoutes);
    app.use('/api/ajuste_estoque', authMiddleware, checkRole(['Administrador', 'Auditor']), ajusteEstoqueRoutes);
    app.get('/api/dispensacoesTabela', authMiddleware, checkRole(['Administrador', 'Farmacêutico', 'Técnico de Farmácia', 'Auditor']), getDispensacaoData);
    app.use('/api/relatorios', relatoriosRouter);

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
