const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const ClasseEtude = require('./ClasseEtude');
const Eleve = require('./Eleve');

const Inscription = sequelize.define('Inscription', {
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
  idEleve: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Eleve,
      key: 'id'
    }
  },
  anneeInscription: {
    type: DataTypes.INTEGER, // Changement de DATE à INTEGER
    allowNull: false
  },
  numeroDordre: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  redoublant: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null // Valeur par défaut à NULL
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['idEleve', 'anneeInscription']
    }
  ]
});

Inscription.belongsTo(ClasseEtude, { foreignKey: 'idClasseEtude' });
ClasseEtude.hasMany(Inscription, { foreignKey: 'idClasseEtude' });

Inscription.belongsTo(Eleve, { foreignKey: 'idEleve' });
Eleve.hasMany(Inscription, { foreignKey: 'idEleve' });

module.exports = Inscription;
