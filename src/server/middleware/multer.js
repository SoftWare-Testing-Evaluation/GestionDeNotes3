// middleware/multer.js
const multer = require('multer');
const path = require('path');

// Configuration de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        cb(null, uploadDir); // Dossier où les fichiers seront stockés
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Nom de fichier unique
    }
});

const upload = multer({ storage: storage });

module.exports = upload;

