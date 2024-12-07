// controllers/noteController.js
const Note = require('../models/Note');
const Matiere = require('../models/Matiere');
const ClasseEtude = require('../models/ClasseEtude');
const Eleve = require('../models/Eleve');
const Dispenser = require('../models/Dispenser');
const Inscription = require('../models/Inscription');

exports.getNotesByMatiereAndClasse = async (req, res) => {
  const { idMatiere, idClasseEtude } = req.params;
  const annee = req.query.annee;

  try {
      // Étape 1 : Récupérer les élèves inscrits dans la classe pour l'année spécifiée
      const inscriptions = await Inscription.findAll({
          where: {
              idClasseEtude,
              anneeInscription: annee
          },
          include: [{
              model: Eleve,
              required: true // Assurez-vous que les élèves sont inclus
          }]
      });

      if (!inscriptions.length) {
          return res.status(404).json({ message: "Aucun élève inscrit trouvé." });
      }

      // Récupérer les IDs des élèves inscrits
      const idsEleves = inscriptions.map(inscription => inscription.idEleve);

      // Étape 2 : Récupérer les dispensations de la matière pour la classe et l'année spécifiées
      const dispensations = await Dispenser.findAll({
          where: {
              idMatiere,
              idClasseEtude,
              annee
          }
      });

      if (!dispensations.length) {
          return res.status(404).json({ message: "Aucune dispense trouvée." });
      }

      // Étape 3 : Récupérer les notes pour les élèves inscrits et la matière dispensée
      const notes = await Note.findAll({
          where: {
              idMatiere,
              idEleve: idsEleves
          },
          include: [{
              model: Eleve,
              required: true // Cela garantit que seules les notes des élèves liés aux inscriptions sont récupérées
          }]
      });

      res.json(notes);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur interne du serveur." });
  }
};



exports.createNote = async (req, res) => {
  try {
    const { idEleve, idMatiere, seq1, seq2, seq3, seq4, seq5, seq6 } = req.body;
    const note = await Note.create({ idEleve, idMatiere, seq1, seq2, seq3, seq4, seq5, seq6 });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note non trouvée' });
    }
    await note.update(req.body);
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note non trouvée' });
    }
    await note.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
