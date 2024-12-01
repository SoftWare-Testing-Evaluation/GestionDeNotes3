// db.js
const Sequelize =require('sequelize');

require('dotenv').config(); // Charger les variables d'environnement

// Configurer la connexion à la base de données
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE,
  logging: false
});


/* const PrefetEtude = require('./models/PrefetEtude');
const ClasseEtude = require('./models/ClasseEtude');
const Enseignant = require('./models/Enseignant');
const Eleve = require('./models/Eleve');
const Inscription = require('./models/Inscription');
const Note = require('./models/Note');
const Dispenser = require('./models/Dispenser');
const Matiere = require('./models/Matiere');
  */
 
// Tester la connexion et synchroniser les modèles
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');
    
    // Synchroniser tous les modèles
    await sequelize.sync({ alter: true }); // Met à jour les tables existantes sans perte de données
    console.log('Tables créées ou mises à jour sans perte de données.');
  } catch (err) {
    console.error('Impossible de se connecter à la base de données :', err);
  }
})();

module.exports = sequelize;
