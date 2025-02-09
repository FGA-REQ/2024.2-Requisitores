const express = require('express');
const router = express.Router();
const loteController = require('../controllers/loteController');

router.get('/', loteController.getLotes);
router.get('/:id', loteController.getLoteById);
router.post('/', loteController.addLote);
router.put('/:id', loteController.updateLote);
router.delete('/:id', loteController.deleteLote);

module.exports = router;
