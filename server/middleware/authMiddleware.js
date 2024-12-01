// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Récupérer le token

    if (!token) {
        return res.status(403).json({ message: 'Token requis' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }
        req.prefetId = decoded.id; // Stocker l'ID du préfet dans la requête
        next();
    });
};

module.exports = authMiddleware;
