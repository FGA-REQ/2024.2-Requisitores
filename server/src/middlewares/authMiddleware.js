const jwt = require('jsonwebtoken');
const SECRET_KEY = "seu_segredo_super_secreto";

// Middleware de autenticação
const autenticar = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ mensagem: "Token não fornecido." });
    }

    jwt.verify(token.replace("Bearer ", ""), SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensagem: "Token inválido." });
        }
        req.usuarioId = decoded.ID_Usuario;
        next();
    });
};

module.exports = { autenticar };
