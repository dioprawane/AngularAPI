let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EleveSchema = Schema({
    idEleve: Number,
    nom: String,
    prenom: String,
    note: Number,
    assignments: [{type : mongoose.Schema.Types.ObjectId, ref: 'Assignment'}],
    matieres: [{type : mongoose.Schema.Types.ObjectId, ref: 'Matiere'}]
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Eleve', EleveSchema);

