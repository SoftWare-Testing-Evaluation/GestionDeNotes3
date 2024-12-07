// controllers/dispenserController.js
const Dispenser = require('../models/Dispenser');
const Matiere = require('../models/Matiere');
const ClasseEtude = require('../models/ClasseEtude');
const Enseignant = require('../models/Enseignant');

exports.createDispenser = async (req, res) => {
  try {
    const { idMatiere, idClasseEtude, idEnseignant, annee } = req.body;
    const dispenser = await Dispenser.create({ idMatiere, idClasseEtude, idEnseignant, annee });
    res.status(201).json(dispenser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDispensations = async (req, res) => {
  try {
    const dispensations = await Dispenser.findAll();
    res.status(200).json(dispensations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDispensation = async (req, res) => {
  try {
    const dispenser = await Dispenser.findByPk(req.params.id);
    if (!dispenser) {
      return res.status(404).json({ message: 'Dispensation non trouvée' });
    }
    res.status(200).json(dispenser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDispensation = async (req, res) => {
  try {
    const dispenser = await Dispenser.findByPk(req.params.id);
    if (!dispenser) {
      return res.status(404).json({ message: 'Dispensation non trouvée' });
    }
    await dispenser.update(req.body);
    res.status(200).json(dispenser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDispensation = async (req, res) => {
  try {
    const dispenser = await Dispenser.findByPk(req.params.id);
    if (!dispenser) {
      return res.status(404).json({ message: 'Dispensation non trouvée' });
    }
    await dispenser.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
