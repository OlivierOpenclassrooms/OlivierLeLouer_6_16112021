const express = require('express');

//Permet de créer des routeurs séparés pour chaque route principale
const router = express.Router();

const userCtrl = require('../controllers/user');

//Mise en place de toutes les routes nécessaires à l'authentification
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;