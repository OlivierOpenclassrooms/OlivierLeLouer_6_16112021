//Permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');

//PERMET DE RECUPERER LE FORMAT D'UNE IMAGE
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png'
};

//RENOMME ET ENREGISTRE L'IMAGE DANS LE DOSSIER "IMAGES"
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split('.')[0].split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}_${Date.now()}.${extension}`);
  }
});

module.exports = multer({storage}).single('image');