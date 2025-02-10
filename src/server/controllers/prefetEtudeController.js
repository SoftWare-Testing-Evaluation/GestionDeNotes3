// controllers/prefetEtudeController.js
const PrefetEtude = require('../models/PrefetEtude');
const { Op } = require('sequelize');
const cloudinary = require('../config/cloudinary'); // Assurez-vous d'importer Cloudinary
exports.createPrefetEtude = async (req, res) => {
  try {
    const { nom, prenom, email, password, login,telephone } = req.body;

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

    const prefetEtude = await PrefetEtude.create({ nom, prenom, email, password, login,telephone });
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

    // Téléchargement des images si elles existent
    let urlCachet = prefetEtude.urlCachet;
    let urlSignature = prefetEtude.urlSignature;
    console.log('contenu du body: ', req.body);

    if (req.files) {
      // Supprimer l'ancien cachet si un nouveau est fourni
      if (req.files.cachet) {
        console.log('cachet: ',req.files.cachet);
        if (prefetEtude.urlCachet) {
          await cloudinary.uploader.destroy(getPublicIdFromUrl(prefetEtude.urlCachet));
        }
        const resultCachet = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) {
              console.log("Erreur lors de l'upload du cachet :", error);
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          });
          stream.end(req.files.cachet[0].buffer);
        });
        urlCachet = resultCachet;
      }

      // Supprimer l'ancienne signature si une nouvelle est fournie
      if (req.files.signature) {
        console.log('signature: ',req.files.signature);
        if (prefetEtude.urlSignature) {
          await cloudinary.uploader.destroy(getPublicIdFromUrl(prefetEtude.urlSignature));
        }
        const resultSignature = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) {
              console.log("Erreur lors de l'upload de la signature :", error);
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          });
          stream.end(req.files.signature[0].buffer);
        });
        urlSignature = resultSignature;
      }
    }
    console.log('url du cacher:', urlCachet);
    console.log('url de la signatue: ', urlSignature)
    // Mise à jour du préfet d'étude
    await prefetEtude.update({
      ...req.body,
      urlCachet,
      urlSignature
    });

    res.status(200).json(prefetEtude);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fonction pour extraire l'ID public de l'URL Cloudinary
function getPublicIdFromUrl(url) {
  const parts = url.split('/');
  const publicId = parts[parts.length - 1].split('.')[0];
  return publicId;
}



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