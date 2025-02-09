const express = require('express');
const router = express.Router();
const ajusteEstoqueController = require('../controllers/ajusteEstoqueController');

router.get('/', ajusteEstoqueController.getAjustesEstoque);
router.get('/:id', ajusteEstoqueController.getAjusteEstoqueById);
router.post('/', ajusteEstoqueController.addAjusteEstoque);
router.put('/:id', ajusteEstoqueController.updateAjusteEstoque);
router.delete('/:id', ajusteEstoqueController.deleteAjusteEstoque);

module.exports = router;
