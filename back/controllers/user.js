//Permet de chiffrer des données
const bcrypt = require('bcrypt');

//Permet de vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    //Appelle de bcrypt qui hasher le mot de passe 10 fois ici et renvoie une promise
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        //Conversion de l'objet "User" en une chaîne "user"
        const user = new User({
            email: req.body.email,
            password: hash
        });
        //Enregristre dans la base de données
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    //Recherche si le mail existe
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            //S'il existe compare mot de passe entré et le hash de la base de données
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de pass incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        //Encode un nouveau token
                        token: jwt.sign(
                            { userId: user._id },
                            //Utilisation d'une chaîne de caractère temporaire
                            'RANDOM_TOKEN_SECRET',
                            //Durée de validité et demande de reconnection au bout de 24h
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
};