// routes/dispenserRoutes.js
const express = require('express');
const router = express.Router();
const dispenserController = require('../controllers/dispenserController');

router.post('/', dispenserController.createDispenser);
router.get('/', dispenserController.getDispensations);
router.get('/:id', dispenserController.getDispensation);
router.put('/:id', dispenserController.updateDispensation);
router.delete('/:id', dispenserController.deleteDispensation);

module.exports = router;
