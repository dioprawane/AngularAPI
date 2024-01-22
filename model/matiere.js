let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MatiereSchema = Schema({
    idMatiere: Number,
    nom: String,
    enseignant: String,
    imageMatiere: String,
    imageProf: String,
    assignments: [{type : mongoose.Schema.Types.ObjectId, ref: 'Assignment'}],
    eleves: [{type : mongoose.Schema.Types.ObjectId, ref: 'Eleve'}]
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Matiere', MatiereSchema);
