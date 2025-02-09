const express = require('express');
const router = express.Router();
const loteController = require('../controllers/loteController');

router.get('/lotes', loteController.getLotes);
router.get('/lotes/:id', loteController.getLoteById);
router.post('/lotes', loteController.addLote);
router.put('/lotes/:id', loteController.updateLote);
router.delete('/lotes/:id', loteController.deleteLote);

module.exports = router;
