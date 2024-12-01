// controllers/matiereController.js
const Matiere = require('../models/Matiere');
const Dispenser = require('../models/Dispenser');
const ClasseEtude = require('../models/ClasseEtude');
const Enseignant = require('../models/Enseignant');

exports.createMatiere = async (req, res) => {
  try {
    const { designation, coefficient} = req.body;
    const matiere = await Matiere.create({designation, coefficient});
    res.status(201).json(matiere);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMatieres = async (req, res) => {
  try {
    const matieres = await Matiere.findAll();
    res.status(200).json(matieres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMatiere = async (req, res) => {
  try {
    const matiere = await Matiere.findByPk(req.params.id);
    if (!matiere) {
      return res.status(404).json({ message: 'Matière non trouvée' });
    }
    res.status(200).json(matiere);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMatiere = async (req, res) => {
  try {
    const matiere = await Matiere.findByPk(req.params.id);
    if (!matiere) {
      return res.status(404).json({ message: 'Matière non trouvée' });
    }
    await matiere.update(req.body);
    res.status(200).json(matiere);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMatiere = async (req, res) => {
  try {
    const matiere = await Matiere.findByPk(req.params.id);
    if (!matiere) {
      return res.status(404).json({ message: 'Matière non trouvée' });
    }
    await matiere.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMatieresByClasse = async (req, res) => {
  try {
    const { idClasseEtude, annee } = req.params;

    const matieres = await Matiere.findAll({
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

    res.status(200).json(matieres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMatieresByEnseignant = async (req, res) => {
  try {
    const { idEnseignant, annee } = req.params;

    const matieres = await Matiere.findAll({
      include: [
        {
          model: Dispenser,
          where: {
            idEnseignant,
            annee
          },
          required: true
        }
      ]
    });

    res.status(200).json(matieres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
