// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PrefetEtude = require('../models/PrefetEtude'); // Assurez-vous d'importer votre modèle
const { Op } = require('sequelize');

// Endpoint pour l'authentification
router.post('/', async (req, res) => {
    const { login, email, password } = req.body;

    try {
        // Trouver le préfet d'étude par login ou email
        const prefet = await PrefetEtude.findOne({
            where: {
                [Op.or]: [{ login }, { email }]
            }
        });

        if (!prefet) {
            return res.status(404).json({ message: 'Préfet d\'étude non trouvé' });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, prefet.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }
        
        // Générer un token
        const token = jwt.sign({ id: prefet.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
