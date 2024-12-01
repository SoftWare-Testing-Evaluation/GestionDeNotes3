// controllers/classeEtudeController.js
const ClasseEtude = require('../models/ClasseEtude');

// Récupérer toutes les classes d'étude
const getAllClasses = async (req, res) => {
  try {
    const classes = await ClasseEtude.findAll();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des classes d\'étude', error });
  }
};

// Récupérer une classe d'étude par ID
const getClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const classe = await ClasseEtude.findByPk(id);
    if (!classe) {
      return res.status(404).json({ message: 'Classe d\'étude non trouvée' });
    }
    res.status(200).json(classe);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la classe d\'étude', error });
  }
};

// Créer une nouvelle classe d'étude
const createClass = async (req, res) => {
  const { idPrefet, nom } = req.body;
  try {
    const newClass = await ClasseEtude.create({ idPrefet, nom });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la classe d\'étude', error });
  }
};

// Mettre à jour une classe d'étude par ID
const updateClass = async (req, res) => {
  const { id } = req.params;
  const { idPrefet, nom } = req.body;
  try {
    const classe = await ClasseEtude.findByPk(id);
    if (!classe) {
      return res.status(404).json({ message: 'Classe d\'étude non trouvée' });
    }
    classe.idPrefet = idPrefet;
    classe.nom = nom;
    await classe.save();
    res.status(200).json(classe);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la classe d\'étude', error });
  }
};

// Supprimer une classe d'étude par ID
const deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    const classe = await ClasseEtude.findByPk(id);
    if (!classe) {
      return res.status(404).json({ message: 'Classe d\'étude non trouvée' });
    }
    await classe.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la classe d\'étude', error });
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
};
