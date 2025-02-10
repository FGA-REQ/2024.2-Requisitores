const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController'); // Verifique se o caminho está correto

// Definição correta das rotas
router.get('/', estoqueController.getEstoques);
router.get('/:id', estoqueController.getEstoqueById);
router.post('/', estoqueController.addEstoque);
router.put('/:id', estoqueController.updateEstoque);
router.delete('/:id', estoqueController.deleteEstoque);

module.exports = router;
