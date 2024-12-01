// controllers/enseignantController.js
const Enseignant = require('../models/Enseignant');
const ClasseEtude = require('../models/ClasseEtude');
const Dispenser = require('../models/Dispenser');

exports.createEnseignant = async (req, res) => {
  try {
    const { nom, prenom, email, specialite, grade } = req.body;
    const enseignant = await Enseignant.create({ nom, prenom, email, specialite, grade });
    res.status(201).json(enseignant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEnseignants = async (req, res) => {
  try {
    const enseignants = await Enseignant.findAll();
    res.status(200).json(enseignants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEnseignant = async (req, res) => {
  try {
    const enseignant = await Enseignant.findByPk(req.params.id);
    if (!enseignant) {
      return res.status(404).json({ message: 'Enseignant non trouvé' });
    }
    res.status(200).json(enseignant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEnseignant = async (req, res) => {
  try {
    const enseignant = await Enseignant.findByPk(req.params.id);
    if (!enseignant) {
      return res.status(404).json({ message: 'Enseignant non trouvé' });
    }
    await enseignant.update(req.body);
    res.status(200).json(enseignant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEnseignant = async (req, res) => {
  try {
    const enseignant = await Enseignant.findByPk(req.params.id);
    if (!enseignant) {
      return res.status(404).json({ message: 'Enseignant non trouvé' });
    }
    await enseignant.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEnseignantsParClasse = async (req, res) => {
  try {
    const { idClasseEtude, annee } = req.params;

    const enseignants = await Enseignant.findAll({
      include: [
        {
          model: Dispenser,
          where: {
            idClasseEtude: idClasseEtude,
            annee:annee
          },
          required: true
        }
      ]
    });

    res.status(200).json(enseignants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
