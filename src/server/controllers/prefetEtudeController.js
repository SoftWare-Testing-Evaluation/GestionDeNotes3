// controllers/prefetEtudeController.js
const PrefetEtude = require('../models/PrefetEtude');
const { Op } = require('sequelize');
exports.createPrefetEtude = async (req, res) => {
  try {
    const { nom, prenom, email, password, login } = req.body;

    // Vérifier si l'email ou le login existe déjà
    const existingPrefet = await PrefetEtude.findOne({
      where: {
        [Op.or]: [
          { email: email },
          { login: login }
        ]
      }
    });

    if (existingPrefet) {
      return res.status(400).json({ message: 'L\'email ou le login existe déjà.' });
    }

    const prefetEtude = await PrefetEtude.create({ nom, prenom, email, password, login });
    res.status(201).json(prefetEtude);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPrefetEtudes = async (req, res) => {
  try {
    const prefetEtudes = await PrefetEtude.findAll();
    res.status(200).json(prefetEtudes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPrefetEtude = async (req, res) => {
  try {
    const prefetEtude = await PrefetEtude.findByPk(req.params.id);
    if (!prefetEtude) {
      return res.status(404).json({ message: 'Préfet d\'étude non trouvé' });
    }
    res.status(200).json(prefetEtude);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePrefetEtude = async (req, res) => {
  try {
    const prefetEtude = await PrefetEtude.findByPk(req.params.id);
    if (!prefetEtude) {
      return res.status(404).json({ message: 'Préfet d\'étude non trouvé' });
    }

    const { email, login } = req.body;

    // Vérifier l'existence de l'email ou du login uniquement s'ils sont fournis
    if (email || login) {
      const existingPrefet = await PrefetEtude.findOne({
        where: {
          [Op.or]: [
            email ? { email: email, id: { [Op.ne]: prefetEtude.id } } : null,
            login ? { login: login, id: { [Op.ne]: prefetEtude.id } } : null
          ].filter(Boolean) // Filtrer les valeurs nulles
        }
      });

      if (existingPrefet) {
        return res.status(400).json({ message: 'L\'email ou le login existe déjà.' });
      }
    }

    await prefetEtude.update(req.body);
    res.status(200).json(prefetEtude);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.deletePrefetEtude = async (req, res) => {
  try {
    const prefetEtude = await PrefetEtude.findByPk(req.params.id);
    if (!prefetEtude) {
      return res.status(404).json({ message: 'Préfet d\'étude non trouvé' });
    }
    await prefetEtude.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};