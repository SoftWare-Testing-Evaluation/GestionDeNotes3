//src/server/app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json'); // Chemin vers votre swagger.json
const dotenv = require('dotenv');
const sequelize = require('./db'); // Importer la configuration de la base de données
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');
// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middleware pour parser le JSON
app.use(express.json());
let server; // Déclarez une variable pour le serveur

// Configurer CORS
app.use(cors({
  origin: '*', // Remplacez par l'URL de votre frontend
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Méthodes autorisées
  credentials: true // Si vous utilisez des cookies
}));


// Routes 
app.use('/auth', require('./routes/authRoutes')); // Route pour l'authentification
app.use('/classeEtude', authMiddleware, require('./routes/classeEtudeRoutes'));
app.use('/prefetEtudes',require('./routes/prefetEtudeRoutes')); // Routes pour les préfets d'étude
app.use('/eleves', require('./routes/eleveRoutes')); // Routes pour les eleves
app.use('/enseignants', authMiddleware, require('./routes/enseignantRoutes')); // Routes pour les enseignants
app.use('/matieres', authMiddleware, require('./routes/matiereRoutes')); // Routes pour les matières
app.use('/dispensations', authMiddleware, require('./routes/dispenserRoutes')); // Routes pour les dispensations
app.use('/notes', authMiddleware, require('./routes/noteRoutes')); // Routes pour les notes
// Ajoutez d'autres routes ici


// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Démarrer le serveur
const start=()=>{
  const PORT = process.env.PORT || 8080; // Utiliser 8080 si PORT n'est pas défini
  server=app.listen(PORT, () => {
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
    })
  }
  // Fonction pour arrêter le serveur
const stop = async () => {
  if (server) {
    await server.close();
    console.log('Serveur arrêté.');
  }
};

module.exports = { start, stop, app };
