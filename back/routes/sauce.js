const express = require('express');

//Permet de créer des routeurs séparés pour chaque route principale
const router = express.Router();

const sauceCtrl = require ('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

//Mise en place de toutes les routes nécessaires au traitement des sauces
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/:id/like', auth, sauceCtrl.like);

module.exports = router;