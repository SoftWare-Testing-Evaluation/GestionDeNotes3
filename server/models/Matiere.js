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
  coefficient: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
});

module.exports = Matiere;
