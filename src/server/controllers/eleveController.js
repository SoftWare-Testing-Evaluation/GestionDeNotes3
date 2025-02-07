const Eleve = require('../models/Eleve');
const Inscription = require('../models/Inscription');
const ClasseEtude = require('../models/ClasseEtude');
const { Op } = require('sequelize');
const cloudinary = require('../config/cloudinary');
const sharp = require('sharp');

exports.createEleve = async (req, res) => {
  try {
     

    const { idClasseEtude,matricule, nom, prenom, dateNaissance, lieuNaissance, nomPere,telPere, nomMere,telMere, sexe, redoublant } = req.body;
console.log(req.body);
    // Générer le matricule
   const anneeInscription = new Date().getFullYear();
   /* const lettre = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const chiffres = Math.floor(1000 + Math.random() * 9000);
    const matricule = `${anneeInscription % 100}${lettre}${chiffres}`;
*/
console.log('Contenu de "images" dans req.body:', req.body.images);
   // Récupérer l'URL de la photo
const image=req.file;
   console.log('Contenu de "images" dans req.files:',image); // Vérifiez les fichiers reçusconst images = req.files; // Utilisez multer pour gérer les fichiers
  
   /// Créer l'élève sans les images
   const eleve = await Eleve.create({
     matricule, nom, prenom, dateNaissance, lieuNaissance,
     sexe, nomPere, telPere, nomMere, telMere, redoublant
   });

   // Vérifier si des images ont été envoyées
    // Vérifier si une image a été envoyée
    if (image) { // Utilisez req.file au lieu de req.files
      try {
        // Télécharger l'image sur Cloudinary
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) {
              console.error("Erreur lors de l'upload de l'image :", error);
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          });
          stream.end(image.buffer); // Utiliser req.file
        });

        console.log(result);
        // Mettre à jour l'élève avec l'URL de l'image
        await eleve.update({ urlPhoto: result }); // Mettre à jour avec une seule URL
     } catch (error) {
       console.log('Erreur lors de l\'upload des images sur Cloudinary :', error);
       return res.status(500).json({ message: 'Erreur lors de l\'upload des images' });
     }
   }

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
    console.log(req.body)
     // Vérifier si une nouvelle image a été fournie
     const image = req.file; // Utilisez req.file pour récupérer l'image
     console.log('Contenu de "images" dans req.files:',image); // Vérifiez les fichiers reçusconst images = req.files; // Utilisez multer pour gérer les fichiers
     // Si une image est fournie, uploader la nouvelle image et supprimer l'ancienne
     if (image) {
       try {
         // Supprimer l'ancienne image de Cloudinary
         
         const oldImageUrl = eleve.urlPhoto; // Récupérer l'URL de l'ancienne image
         if(oldImageUrl){
          console.log("url de l'ancienne image: ", oldImageUrl)
         const publicId = oldImageUrl.split('/').pop().split('.')[0]; // Extraire le public ID de l'URL
         console.log("le public ID de l'URL: ", publicId)

         await cloudinary.uploader.destroy(publicId); // Supprimer l'ancienne image

         }
         
 
         // Télécharger la nouvelle image sur Cloudinary
         const result = await new Promise((resolve, reject) => {
           const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
             if (error) {
               console.error("Erreur lors de l'upload de l'image :", error);
               reject(error);
             } else {
               resolve(result.secure_url);
             }
           });
           stream.end(image.buffer);
         });
 
         // Mettre à jour l'élève avec l'URL de la nouvelle image
         await eleve.update({ urlPhoto: result });
       } catch (error) {
         console.log('Erreur lors de l\'upload de l\'image sur Cloudinary :', error);
         return res.status(500).json({ message: 'Erreur lors de l\'upload de l\'image' });
       }
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
console("donnee de l'eleve:",eleve)
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

