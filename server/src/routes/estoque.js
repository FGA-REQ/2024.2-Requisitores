const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

router.get('/', estoqueController.getEstoques);
router.get('/:id', estoqueController.getEstoqueById);
router.post('/', estoqueController.addEstoque);
router.put('/:id', estoqueController.updateQuantidadeEstoque); // Nova rota
router.delete('/:id', estoqueController.deleteEstoque);

module.exports = router;
