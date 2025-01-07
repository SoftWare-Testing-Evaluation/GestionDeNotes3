// models/Matiere.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Matiere = sequelize.define('Matiere', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  groupe: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Matiere;
