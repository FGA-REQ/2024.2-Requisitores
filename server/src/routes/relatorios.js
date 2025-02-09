const express = require('express');
const router = express.Router();
const relatoriosController = require('../controllers/relatoriosController');

router.get('/inventario', relatoriosController.getInventoryReport);

module.exports = router;
