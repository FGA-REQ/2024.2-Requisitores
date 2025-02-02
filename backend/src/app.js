const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Inicializa o app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Importa o server.js e configura rotas e banco de dados
const setupServer = require('./server');
setupServer(app);