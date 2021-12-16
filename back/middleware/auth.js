//Permet de vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    //Extraction du token du header authorization et utilisation de split pour récupérer tous les éléments après l'espace du header
    const token = req.headers.authorization.split(' ')[1];
    //Décode le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //Extrait l'id utilisateur et compare à celui extrait du token
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Id utilisateur invalide !';
    } else {
        next();
      }
  } catch {res.status(401).json({error: new Error('Requête invalide !')});}
};