const Eleve = require('../models/Eleve');
const Inscription = require('../models/Inscription');
const ClasseEtude = require('../models/ClasseEtude');
const { Op } = require('sequelize');

exports.createEleve = async (req, res) => {
  try {
    const { idClasseEtude,matricule, nom, prenom, dateNaissance, lieuNaissance, nomPere,telPere, nomMere,telMere, sexe, redoublant } = req.body;

    // Générer le matricule
   const anneeInscription = new Date().getFullYear();
   /* const lettre = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const chiffres = Math.floor(1000 + Math.random() * 9000);
    const matricule = `${anneeInscription % 100}${lettre}${chiffres}`;
*/
    // Récupérer l'URL de la photo
    const urlPhoto = req.file ? `/uploads/${req.file.filename}` : null; // Chemin relatif vers la photo

    const eleve = await Eleve.create({ matricule, nom, prenom, dateNaissance, lieuNaissance, nomPere,telPere, nomMere,telMere, sexe, urlPhoto });

    // Récupérer la dernière inscription pour calculer le numéro d'ordre
    const dernierNumeroOrdre = await Inscription.max('numeroDordre', {
      where: {
        idClasseEtude
      }
    });
    const numeroDordre = dernierNumeroOrdre ? dernierNumeroOrdre + 1 : 1;

    // Vérification de l'unicité de l'inscription
    const existingInscription = await Inscription.findOne({
      where: {
        idEleve: eleve.id,
        anneeInscription
      }
    });

    if (existingInscription) {
      return res.status(400).json({ message: 'L\'élève est déjà inscrit dans une classe pour cette année.' });
    }

    // Créer l'inscription
    await Inscription.create({ idEleve: eleve.id, idClasseEtude, anneeInscription, numeroDordre, redoublant });

    res.status(201).json(eleve);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEleves = async (req, res) => {
  try {
    const eleves = await Eleve.findAll();
    res.status(200).json(eleves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEleve = async (req, res) => {
  try {
    const eleve = await Eleve.findByPk(req.params.id);
    if (!eleve) {
      return res.status(404).json({ message: 'Élève non trouvé' });
    }
    res.status(200).json(eleve);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEleveByMatricule = async (req, res) => {
  try {
    const eleve = await Eleve.findOne({ where: { matricule: req.params.matricule } });
    if (!eleve) {
      return res.status(404).json({ message: 'Élève non trouvé' });
    }
    res.status(200).json(eleve);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateEleve = async (req, res) => {
  try {
    const eleve = await Eleve.findByPk(req.params.id);
    if (!eleve) {
      return res.status(404).json({ message: 'Élève non trouvé' });
    }

    // Mise à jour des informations de l'élève
    await eleve.update(req.body);

    let nouvelleInscription = null;

    // Vérification du changement de classe
    if (req.body.idClasseEtude && req.body.annee) {
      const inscriptions = await Inscription.findAll({
        where: { idEleve: eleve.id }
      });

      const oldIdClassEtude = inscriptions.length > 0 ? inscriptions[inscriptions.length - 1].idClasseEtude : null;

      if (oldIdClassEtude !== req.body.idClasseEtude) {
        // Vérification de l'unicité de l'inscription
        const existingInscription = await Inscription.findOne({
          where: {
            idEleve: eleve.id,
            anneeInscription: req.body.annee
          }
        });

        if (existingInscription) {
          return res.status(400).json({ message: 'Cet élève est déjà inscrit dans une autre classe pour cette année.' });
        }

        // Création d'une nouvelle inscription
        const anneeInscription = req.body.annee;
        const dernierNumeroOrdre = await Inscription.max('numeroDordre', {
          where: {
            idClasseEtude: req.body.idClasseEtude,
            anneeInscription: anneeInscription
          }
        });
        const numeroDordre = dernierNumeroOrdre ? dernierNumeroOrdre + 1 : 1;

        nouvelleInscription = await Inscription.create({
          idEleve: eleve.id,
          idClasseEtude: req.body.idClasseEtude,
          anneeInscription: anneeInscription,
          numeroDordre,
          redoublant:"NON"
        });
      }
    }

    // Retourner l'élève avec la nouvelle inscription si elle a été créée
    if (nouvelleInscription) {
      return res.status(200).json({
        eleve,
        nouvelleInscription
      });
    }

    // Retourner uniquement l'élève si aucune nouvelle inscription n'a été créée
    res.status(200).json(eleve);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





exports.deleteEleve = async (req, res) => {
  try {
    // Récupération de l'élève
    const eleve = await Eleve.findByPk(req.params.id);
    if (!eleve) {
      return res.status(404).json({ message: 'Élève non trouvé' });
    }

    // Récupération des inscriptions de l'élève
    const inscriptions = await Inscription.findAll({
      where: { idEleve: eleve.id }
    });

    // Suppression des inscriptions
    if (inscriptions.length > 0) {
      await Inscription.destroy({
        where: { idEleve: eleve.id }
      });
    }

    // Suppression de l'élève
    await eleve.destroy();

    res.status(200).json({ message: 'Élève et ses inscriptions supprimés avec succès' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getElevesParClasse = async (req, res) => {
  try {
    const { idClasseEtude, annee } = req.params;

    // Vérification des paramètres
    if (!idClasseEtude || !annee) {
      return res.status(400).json({ message: 'idClasseEtude et annee sont requis' });
    }

    // Logs pour débogage
    console.log('idClasseEtude:', idClasseEtude, 'annee:', annee);

    const eleves = await Eleve.findAll({
      include: [
        {
          model: Inscription,
          where: {
            idClasseEtude: idClasseEtude,
            anneeInscription: parseInt(annee, 10) // Conversion en entier
          },
          required: true
        }
      ]
    });

    // Vérification des résultats
    if (eleves.length === 0) {
      return res.status(404).json({ message: 'Aucun élève trouvé pour cette classe et cette année' });
    }

    res.status(200).json(eleves);
  } catch (error) {
    console.error(error); // Log de l'erreur pour débogage
    res.status(500).json({ message: error.message });
  }
};


exports.removeEleveFromClass = async (req, res) => {
  const { idEleve, idClasse } = req.params;

  try {
    // Vérification de l'élève
    const eleve = await Eleve.findByPk(idEleve);
    if (!eleve) {
      return res.status(404).json({ message: 'Élève non trouvé' });
    }

    // Vérification de l'inscription de l'élève dans la classe
    const inscription = await Inscription.findOne({
      where: {
        idEleve: eleve.id,
        idClasseEtude: idClasse
      }
    });

    if (!inscription) {
      return res.status(404).json({ message: 'Inscription non trouvée pour cette classe' });
    }

    // Suppression de l'inscription
    await inscription.destroy();

    // Récupération des autres élèves dans la classe triés par matricule, nom et prénom
    const autresEleves = await Inscription.findAll({
      where: { idClasseEtude: idClasse },
      include: [{
        model: Eleve,
        attributes: ['matricule', 'nom', 'prenom']
      }],
      order: [[Eleve, 'matricule', 'ASC'], [Eleve, 'nom', 'ASC'], [Eleve, 'prenom', 'ASC']]
    });

    // Mise à jour des numéros d'ordre
    for (let i = 0; i < autresEleves.length; i++) {
      await autresEleves[i].update({ numeroOrdre: i + 1 });
    }

    res.status(200).json({ message: 'Élève retiré de la classe et numéros d\'ordre mis à jour avec succès' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

