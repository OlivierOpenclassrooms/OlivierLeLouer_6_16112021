# Piiquante #

## Objectif du projet ##

Construction d'une API REST sécurisée avec Node.js et le framework Express pour l'application d'avis gastronomiques Piiquante.

## Exigences de sécurité ##

● Le mot de passe de l'utilisateur est haché.
● L'authentification est renforcée sur toutes les routes sauce requises.
● Les adresses électroniques dans la base de données sont uniques et le
plugin Mongoose unique validator est utilisé pour garantir leur unicité et signaler
les erreurs.
● La sécurité de la base de données MongoDB (à partir d'un service tel que
MongoDB Atlas) ne doit pas empêcher l'application de se lancer sur la
machine d'un utilisateur.
● Le plugin Mongoose assure la remontée des erreurs issues de la base
de données. 
● Le contenu du dossier 'images' n'est pas téléchargé sur GitHub.


### Back end Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

You will need to have a MongoDB Database and connect it in app.js.

### Back end Installation ###

Clone this repo. From the "back" folder of the project, run `npm install`. You 
can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.

### Front-end installation ###

Here are the dependancies you need to install:
- NodeJS 12.14 or 14.0.
- Angular CLI 7.0.2.
- node-sass : make sure to use the corresponding version to NodeJS. For Noe 14.0 for instance, you need node-sass in version 4.14+.

On Windows, these installations require to use PowerShell in administrator mode.

Then, clone this repo, `run npm install`, and `run npm install --save-dev run-script-os`.

### Front-end usage ###

Run `npm start`. This should both run the local server and launch your browser.

If your browser fails to launch, or shows a 404 error, navigate your browser to http://localhost:8080.

The app should reload automatically when you make a change to a file.

Use `Ctrl+C` in the terminal to stop the local server.
