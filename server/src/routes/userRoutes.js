const express = require('express');
const router = express.Router();
const { registrarUsuario } = require('../utils/passwordUtils');
const db = require('../db'); // Assumindo que você tem um módulo db para conexão com o banco de dados

router.post('/registrar', async (req, res) => {
    const { nome, login, senha, perfil } = req.body;
    if (!nome || !login || !senha || !perfil) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    try {
        await registrarUsuario(db, { Nome: nome, Login: login, Senha: senha, Perfil: perfil });
        res.status(201).json({ mensagem: 'Usuário registrado com sucesso.' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao registrar usuário.' });
    }
});

module.exports = router;
