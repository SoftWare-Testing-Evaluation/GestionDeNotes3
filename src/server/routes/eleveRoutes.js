// routes/eleveRoutes.js
const express = require('express');
const router = express.Router();
const eleveController = require('../controllers/eleveController');
const multer = require('multer');
//const upload = require('../middleware/multer');
const authMiddleware = require('../middleware/authMiddleware');

// Configuration de multer pour le stockage temporaire
const storage = multer.memoryStorage(); // Utiliser la mémoire pour le stockage temporaire
const upload = multer({ storage });
// Route pour créer un élève avec upload de photo
router.post('/',authMiddleware, upload.array('images',10), eleveController.createEleve);
router.get('/',authMiddleware, eleveController.getEleves);
router.get('/:id',authMiddleware, eleveController.getEleve);
router.get('/matricule/:matricule',authMiddleware, eleveController.getEleveByMatricule);
router.get('/classe/:idClasseEtude/:annee',authMiddleware, eleveController.getElevesParClasse);
router.put('/:id',authMiddleware, eleveController.updateEleve);
router.delete('/:id',authMiddleware, eleveController.deleteEleve);
router.delete('/retirer/:idEleve/:idClasse',authMiddleware, eleveController.removeEleveFromClass);
module.exports = router;
