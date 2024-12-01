// routes/eleveRoutes.js
const express = require('express');
const router = express.Router();
const eleveController = require('../controllers/eleveController');

router.post('/', eleveController.createEleve);
router.get('/', eleveController.getEleves);
router.get('/:id', eleveController.getEleve);
router.get('/matricule/:matricule', eleveController.getEleveByMatricule);
router.get('/classe/:idClasseEtude/:annee', eleveController.getElevesParClasse);
router.put('/:id', eleveController.updateEleve);
router.delete('/:id', eleveController.deleteEleve);
router.delete('/retirer/:idEleve/:idClasse', eleveController.removeEleveFromClass);
module.exports = router;
