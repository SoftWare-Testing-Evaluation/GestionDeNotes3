// routes/matiereRoutes.js
const express = require('express');
const router = express.Router();
const matiereController = require('../controllers/matiereController');

router.post('/', matiereController.createMatiere);
router.get('/', matiereController.getMatieres);
router.get('/:id', matiereController.getMatiere);
router.put('/:id', matiereController.updateMatiere);
router.delete('/:id', matiereController.deleteMatiere);
router.get('/classe/:idClasseEtude/:annee', matiereController.getMatieresByClasse);
router.get('/enseignant/:idEnseignant/:annee', matiereController.getMatieresByEnseignant);

module.exports = router;
