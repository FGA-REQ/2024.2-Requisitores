const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/pacientes', pacienteController.getPacientes);
router.get('/pacientes/:id', pacienteController.getPacienteById);
router.post('/pacientes', pacienteController.addPaciente);
router.put('/pacientes/:id', pacienteController.updatePaciente);
router.delete('/pacientes/:id', pacienteController.deletePaciente);

module.exports = router;
