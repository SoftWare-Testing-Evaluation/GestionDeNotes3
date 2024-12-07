// routes/prefetEtudeRoutes.js
const express = require('express');
const router = express.Router();
const prefetEtudeController = require('../controllers/prefetEtudeController');

router.post('/', prefetEtudeController.createPrefetEtude);
router.get('/', prefetEtudeController.getPrefetEtudes);
router.get('/:id', prefetEtudeController.getPrefetEtude);
router.put('/:id', prefetEtudeController.updatePrefetEtude);
router.delete('/:id', prefetEtudeController.deletePrefetEtude);

module.exports = router;