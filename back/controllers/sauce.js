const Sauce = require('../models/sauce');

//Permet de midifier le système de fichiers
const fs = require('fs');



exports.createSauce = (req, res, next) => {
    //Création d'une constante pour obtenir un objet utilisable
    const sauceObject = JSON.parse(req.body.sauce);
    //Suppression de l'_id envoyé par le front-end
    delete sauceObject._id;
    //Conversion de l'objet "Sauce" en une chaîne "sauce"
    const sauce = new Sauce({
        ...sauceObject,
        //Utilisation de l'URL complète de l'image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    //Enregristre dans la base de données
    sauce.save()
        .then(() => res.status(201).json({message: "Objet enregistré"}))
        .catch(error => res.status(400).json({error}));
  };

exports.modifySauce = (req, res, next) => {
    //Constante qui regarde si "req.file" existe. Si oui, traite la nouvelle image. Si non, traite l'objet entrant.
    const sauceObject = req.file ?
        {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
        //Crée une instance "Sauce" à partir de "sauceObject"
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    //Utilisation de la méthode findOne() du modèle Mongoose qui renvoit la Sauce ayant le même _id que le paramètre de la requête
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        //Séparation du nom du fichier grâce au "/images/"" contenu dans l'url
        const filename = sauce.imageUrl.split('/images/')[1];
        //Utilisation de la fonction unlink pour supprimer l'image et suppression de toute la Sauce
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

  //Utilisation de la méthode findOne() du modèle Mongoose qui renvoit la Sauce ayant le même _id que le paramètre de la requête
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

//Utilisation de la méthode find() du modèle Mongoose qui renvoit un tableau de toutes les Sauces de notre base de données
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.like = (req, res, next) => {
    const like = req.body.like;

    //AJOUTER UN LIKE OU UN DISLIKE

    if (like === 1) {
        Sauce.updateOne({_id: req.params.id}, {
            //Insère le userId dans le tableau usersLiked du modèle
            $push: {usersLiked: req.body.userId},
            //Ajoute le likes
            $inc: {likes: +1},
        })
            .then(() => res.status(200).json({message: 'J\'aime !'}))
            .catch((error) => res.status(400).json({error}));
    };
    if (like === -1) {
        Sauce.updateOne({_id: req.params.id}, {
                //Insère le userId dans le tableau usersDisliked du modèle
                $push: {usersDisliked: req.body.userId},
                //Ajoute le dislikes
                $inc: {dislikes: +1},
        })
            .then(() => {res.status(200).json({message: 'Je n\'aime pas !'})})
            .catch((error) => res.status(400).json({error}));
    };

    //RETIRER SON LIKE OU SON DISLIKE

    if (like === 0) {
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            //Regarde si le userId est déjà dans le tableau usersliked/disliked
            if (sauce.usersLiked.includes(req.body.userId)) {
                Sauce.updateOne({_id: req.params.id}, {
                    //Retire le userId dans le tableau usersliked du modèle
                    $pull: {usersLiked: req.body.userId},
                    //Retire le likes
                    $inc: {likes: -1},
                })
                    .then(() => res.status(200).json({message: 'J\'aime retiré !'}))
                    .catch((error) => res.status(400).json({error}))
            };
            if (sauce.usersDisliked.includes(req.body.userId)) {
                Sauce.updateOne({_id: req.params.id}, {
                    //Retire le userId dans le tableau usersDisliked du modèle
                    $pull: {usersDisliked: req.body.userId},
                    //Retire le dislikes
                    $inc: {dislikes: -1},
                })
                    .then(() => res.status(200).json({message: 'Je n\'aime pas retiré !'}))
                    .catch((error) => res.status(400).json({error}))
            };
        })
        .catch((error) => res.status(404).json({error}));
    };
};