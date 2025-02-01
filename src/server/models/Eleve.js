// models/Eleve.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Eleve = sequelize.define('Eleve', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  matricule: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateNaissance: {
    type: DataTypes.DATE,
    allowNull: false
  },
  lieuNaissance: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nomPere: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telPere:{
    type:DataTypes.STRING,
    allowNull:true
  },
  nomMere: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telMere:{
    type:DataTypes.STRING,
    allowNull:true
  },
  sexe: {
    type: DataTypes.STRING,
    allowNull: false
  },
  urlPhoto: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Eleve;