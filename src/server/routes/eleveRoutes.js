// routes/eleveRoutes.js
const express = require('express');
const router = express.Router();
const eleveController = require('../controllers/eleveController');

const upload = require('../middleware/multer');

// Route pour créer un élève avec upload de photo
router.post('/', upload.single('photo'), eleveController.createEleve);
router.get('/', eleveController.getEleves);
router.get('/:id', eleveController.getEleve);
router.get('/matricule/:matricule', eleveController.getEleveByMatricule);
router.get('/classe/:idClasseEtude/:annee', eleveController.getElevesParClasse);
router.put('/:id', eleveController.updateEleve);
router.delete('/:id', eleveController.deleteEleve);
router.delete('/retirer/:idEleve/:idClasse', eleveController.removeEleveFromClass);
module.exports = router;
