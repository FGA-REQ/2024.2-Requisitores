const express = require('express');
const router = express.Router();
const dispensacaoController = require('../controllers/dispensacaoController');

router.get('/dispensacoesTabela', dispensacaoController.getDispensacaoData);
router.get('/dispensacoes', dispensacaoController.getDispensacoes);
router.get('/dispensacoes/:id', dispensacaoController.getDispensacaoById);
router.post('/dispensacoes', dispensacaoController.addDispensacao);
router.put('/dispensacoes/:id', dispensacaoController.updateDispensacao);
router.delete('/dispensacoes/:id', dispensacaoController.deleteDispensacao);

module.exports = router;
