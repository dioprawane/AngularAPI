let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EleveSchema = Schema({
    idEleve: Number,
    nom: String,
    prenom: String
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Eleve', EleveSchema);

