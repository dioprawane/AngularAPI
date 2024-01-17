const mongoose = require('mongoose');

const matiereSchema = new mongoose.Schema({
  nom: String,
  enseignant: String,
  heures: Number
});

module.exports = mongoose.model('Matiere', matiereSchema);
