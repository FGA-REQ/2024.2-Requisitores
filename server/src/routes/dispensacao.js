const express = require('express');
const router = express.Router();
const dispensacaoController = require('../controllers/dispensacaoController');

router.get('/tabela', dispensacaoController.getDispensacaoData);
router.get('/', dispensacaoController.getDispensacoes);
router.get('/:id', dispensacaoController.getDispensacaoById);
router.post('/', dispensacaoController.addDispensacao);
router.put('/:id', dispensacaoController.updateDispensacao);
router.delete('/:id', dispensacaoController.deleteDispensacao);

router.get('/lotes', dispensacaoController.getLotesByMedicamento);

module.exports = router;
