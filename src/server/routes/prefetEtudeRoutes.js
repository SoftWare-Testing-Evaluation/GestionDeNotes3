// routes/prefetEtudeRoutes.js
const express = require('express');
const router = express.Router();
const prefetEtudeController = require('../controllers/prefetEtudeController');
const multer = require('multer');

const storage = multer.memoryStorage(); // Utiliser la mémoire pour le stockage temporaire
const upload = multer({ storage });

router.post('/', prefetEtudeController.createPrefetEtude);
router.get('/', prefetEtudeController.getPrefetEtudes);
router.get('/:id', prefetEtudeController.getPrefetEtude);
// Route pour mettre à jour un préfet d'étude avec upload de cachet et signature
router.put('/:id', upload.fields([{ name: 'cachet' }, { name: 'signature' }]), prefetEtudeController.updatePrefetEtude);
router.delete('/:id', prefetEtudeController.deletePrefetEtude);

module.exports = router;
