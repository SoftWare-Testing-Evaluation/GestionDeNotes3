// models/Note.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Eleve = require('./Eleve');
const Matiere = require('./Matiere');

const Note = sequelize.define('Note', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idEleve: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Eleve,
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
  seq1: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  seq2: {
    type: DataTypes.DOUBLE,
    allowNull: true, // Permettre des valeurs nulles
    defaultValue: null // Valeur par défaut à NULL
  },
  seq3: {
    type: DataTypes.DOUBLE,
    allowNull: true, // Permettre des valeurs nulles
    defaultValue: null // Valeur par défaut à NULL
  },
  seq4: {
    type: DataTypes.DOUBLE,
    allowNull: true, // Permettre des valeurs nulles
    defaultValue: null // Valeur par défaut à NULL
  },
  seq5: {
    type: DataTypes.DOUBLE,
    allowNull: true, // Permettre des valeurs nulles
    defaultValue: null // Valeur par défaut à NULL
  },
  seq6: {
    type: DataTypes.DOUBLE,
    allowNull: true, // Permettre des valeurs nulles
    defaultValue: null // Valeur par défaut à NULL
  }
});

Note.belongsTo(Eleve, { foreignKey: 'idEleve' });
Eleve.hasMany(Note, { foreignKey: 'idEleve' });

Note.belongsTo(Matiere, { foreignKey: 'idMatiere' });
Matiere.hasMany(Note, { foreignKey: 'idMatiere' });

module.exports = Note;