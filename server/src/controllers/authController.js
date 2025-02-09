const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../utils/dbUtils');
const SECRET_KEY = "seu_segredo_super_secreto";

// Função para login
const login = (req, res) => {
    const { login, senha } = req.body;

    if (!login || !senha) {
        return res.status(400).json({ mensagem: "Usuário e senha são obrigatórios." });
    }

    db.get('SELECT * FROM Usuario WHERE login = ?', [login], (err, user) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }

        if (!user || !user.Senha) {
            return res.status(401).json({ mensagem: 'Usuário ou senha incorretos.' });
        }

        bcrypt.compare(senha, user.Senha, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
            }

            if (isMatch) {
                const token = jwt.sign({ id: user.ID_Usuario, login: user.login }, SECRET_KEY, { expiresIn: '2h' });
                res.json({ token, user });
            } else {
                return res.status(401).json({ mensagem: 'Usuário ou senha incorretos.' });
            }
        });
    });
};

// Função para registrar usuário
const registrar = (req, res) => {
    const { nome, login, senha } = req.body;

    if (!nome || !login || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
    }

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ mensagem: "Erro ao criptografar a senha." });
        }

        const query = "INSERT INTO Usuario (nome, login, senha) VALUES (?, ?, ?)";

        db.run(query, [nome, login, hash], function (err) {
            if (err) {
                return res.status(500).json({ mensagem: "Erro ao registrar usuário." });
            }
            res.status(201).json({ mensagem: "Usuário registrado com sucesso!" });
        });
    });
};

// Função para obter o usuário logado
const getUsuarioLogado = (req, res) => {
    res.json({ usuario: req.user });
};

module.exports = { login, registrar, getUsuarioLogado };