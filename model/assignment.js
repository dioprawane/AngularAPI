let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    remarque: String,
    eleves: [{type : mongoose.Schema.Types.ObjectId, ref: 'Eleve'}],
    matiere: {type: mongoose.Schema.Types.ObjectId, ref: 'Matiere'}
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
