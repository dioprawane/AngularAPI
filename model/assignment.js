let mongoose = require('mongoose');
let aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    nom: String,
    dateDeRendu: Date,
    rendu: Boolean,
    remarque: String,
    eleves: [
        {
            idEleve: Number,
            nom: String,
            prenom: String,
            note: Number
        }
    ],
    matiere_idMatiere: Number,
    matiere_nom: String,
    matiere_enseignant: String,
    matiere_imageMatiere: String,
    matiere_imageProf: String

    /*matiere: {
        idMatiere: Number,
        nom: String,
        enseignant: String,
        imageMatiere: String,
        imageProf: String
    }*/
});

AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
