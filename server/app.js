// app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json'); // Chemin vers votre swagger.json
const dotenv = require('dotenv');
const sequelize = require('./db'); // Importer la configuration de la base de données
const authMiddleware = require('./middleware/authMiddleware');
// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middleware pour parser le JSON
app.use(express.json());



// Routes 
app.use('/auth', require('./routes/authRoutes')); // Route pour l'authentification
app.use('/classeEtude', authMiddleware, require('./routes/classeEtudeRoutes'));
app.use('/prefetEtudes',authMiddleware,require('./routes/prefetEtudeRoutes')); // Routes pour les préfets d'étude
app.use('/eleves', authMiddleware, require('./routes/eleveRoutes')); // Routes pour les eleves
app.use('/enseignants', authMiddleware, require('./routes/enseignantRoutes')); // Routes pour les enseignants
app.use('/matieres', authMiddleware, require('./routes/matiereRoutes')); // Routes pour les matières
app.use('/dispensations', authMiddleware, require('./routes/dispenserRoutes')); // Routes pour les dispensations
app.use('/notes', authMiddleware, require('./routes/noteRoutes')); // Routes pour les notes
// Ajoutez d'autres routes ici


// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Démarrer le serveur
const PORT = process.env.PORT || 8080; // Utiliser 8080 si PORT n'est pas défini
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

// Tester la connexion à la base de données
sequelize.authenticate()
 // Synchroniser tous les modèles
 sequelize.sync({ alter: true })
  .then(() => {
    console.log('Connexion à la base de données réussie.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données :', err);
  });
