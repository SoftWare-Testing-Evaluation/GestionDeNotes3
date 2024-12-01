const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcryptjs');

const PrefetEtude = sequelize.define('PrefetEtude', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Rendre l'email unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Rendre le login unique
  }
}, {
  hooks: {
    beforeCreate: async (prefet) => {
      const hashedPassword = await bcrypt.hash(prefet.password, 10);
      prefet.password = hashedPassword;
    },
    beforeUpdate: async (prefet) => {
      if (prefet.changed('password')) {
        const hashedPassword = await bcrypt.hash(prefet.password, 10);
        prefet.password = hashedPassword;
      }
    }
  }
});

module.exports = PrefetEtude;
