// models/ClasseEtude.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const PrefetEtude = require('./PrefetEtude');

const ClasseEtude = sequelize.define('ClasseEtude', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idPrefet: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PrefetEtude,
      key: 'id'
    }
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

ClasseEtude.belongsTo(PrefetEtude, { foreignKey: 'idPrefet' });
PrefetEtude.hasMany(ClasseEtude, { foreignKey: 'idPrefet' });

module.exports = ClasseEtude;