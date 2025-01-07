
// models/Dispenser.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const ClasseEtude = require('./ClasseEtude');
const Matiere = require('./Matiere');
const Enseignant = require('./Enseignant');

const Dispenser = sequelize.define('Dispenser', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idClasseEtude: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ClasseEtude,
      key: 'id'
    }
  },
  idMatiere: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Matiere,
      key: 'id'
    }
  },
  idEnseignant: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Enseignant,
      key: 'id'
    }
  },
  coefficient: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  annee: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Dispenser.belongsTo(ClasseEtude, { foreignKey: 'idClasseEtude' });
ClasseEtude.hasMany(Dispenser, { foreignKey: 'idClasseEtude' });

Dispenser.belongsTo(Matiere, { foreignKey: 'idMatiere' });
Matiere.hasMany(Dispenser, { foreignKey: 'idMatiere' });

Dispenser.belongsTo(Enseignant, { foreignKey: 'idEnseignant' });
Enseignant.hasMany(Dispenser, { foreignKey: 'idEnseignant' });

module.exports = Dispenser;
