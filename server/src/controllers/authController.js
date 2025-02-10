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
const registrar = async (req, res) => {
    const { nome, login, senha, perfil } = req.body;
    const perfilUsuario = 'Técnico de Farmácia'; // Valor padrão para o campo Perfil
    try {
        const hashSenha = await bcrypt.hash(senha, 10);
        await new Promise((resolve, reject) => {
            db.run('INSERT INTO Usuario (Nome, Login, Senha, Perfil) VALUES (?, ?, ?, ?)', [nome, login, hashSenha, perfilUsuario], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        res.status(201).json({ mensagem: 'Usuário registrado com sucesso.' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ mensagem: 'Erro ao registrar usuário.' });
    }
};

// Função para obter o usuário logado
const getUsuarioLogado = (req, res) => {
    res.json({ usuario: req.user });
};

module.exports = { login, registrar, getUsuarioLogado };