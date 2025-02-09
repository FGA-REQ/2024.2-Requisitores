const express = require('express');
const router = express.Router();
const medicamentosController = require('../controllers/medicamentosController');

// Rota para listar todos os medicamentos
router.get('/medicamentos', (req, res) => {
    db.all('SELECT * FROM Medicamento', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rota para buscar um medicamento pelo ID
router.get('/medicamentos/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM Medicamento WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

// Rota para adicionar um novo medicamento
router.post('/medicamentos', (req, res) => {
    const { nome, validade, quantidade } = req.body;
    if (!nome || !validade || !quantidade) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    db.run('INSERT INTO Medicamento (nome, validade, quantidade) VALUES (?, ?, ?)',
        [nome, validade, quantidade],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, nome, validade, quantidade });
        }
    );
});

// Rota para atualizar um medicamento
router.put('/medicamentos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, validade, quantidade } = req.body;
    if (!nome || !validade || !quantidade) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    db.run('UPDATE Medicamento SET nome = ?, validade = ?, quantidade = ? WHERE id = ?',
        [nome, validade, quantidade, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: 'Medicamento atualizado com sucesso' });
        }
    );
});

// Rota para deletar um medicamento
router.delete('/medicamentos/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM Medicamento WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Medicamento deletado com sucesso' });
    });
});

module.exports = router;
