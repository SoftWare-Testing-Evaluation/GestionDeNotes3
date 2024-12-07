// routes/enseignantRoutes.js
const express = require('express');
const router = express.Router();
const enseignantController = require('../controllers/enseignantController');

router.post('/', enseignantController.createEnseignant);
router.get('/', enseignantController.getEnseignants);
router.get('/:id', enseignantController.getEnseignant);
router.put('/:id', enseignantController.updateEnseignant);
router.delete('/:id', enseignantController.deleteEnseignant);
router.get('/classe/:idClasseEtude/:annee', enseignantController.getEnseignantsParClasse);

module.exports = router;
