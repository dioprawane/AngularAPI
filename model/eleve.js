const mongoose = require('mongoose');

const eleveSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  classe: String
});

module.exports = mongoose.model('Eleve', eleveSchema);
