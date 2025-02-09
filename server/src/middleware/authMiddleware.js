const jwt = require('jsonwebtoken');
const { db } = require('../utils/dbUtils');
const SECRET_KEY = "seu_segredo_super_secreto";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensagem: 'Token inválido.' });
        }

        db.get('SELECT * FROM Usuario WHERE ID_Usuario = ?', [decoded.id], (err, user) => {
            if (err || !user) {
                return res.status(401).json({ mensagem: 'Usuário não encontrado.' });
            }

            req.user = user;
            next();
        });
    });
};

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.Perfil)) {
            return res.status(403).json({ mensagem: 'Acesso negado.' });
        }
        next();
    };
};

module.exports = { authMiddleware, checkRole };
