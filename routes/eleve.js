let Eleve = require('../model/eleve');

// Récupérer tous les élèves (GET)
function getEleves(req, res) {
    Eleve.find((err, eleves) => {
        if (err) {
            res.send(err);
        }
        res.send(eleves);
    });
}

// Récupérer un élève par son id (GET)
function getEleve(req, res) {
    let eleveId = req.params.id;

    Eleve.findOne({ _id: eleveId }, (err, eleve) => {
        if (err) { res.send(err) }
        res.json(eleve);
    });
}

// Ajout d'un élève (POST)
function postEleve(req, res) {
    let eleve = new Eleve(req.body);

    eleve.save((err) => {
        if (err) {
            res.send('Impossible de poster l\'élève', err);
        }
        res.json({ message: `${eleve.nom} ${eleve.prenom} enregistré !` });
    });
}

// Update d'un élève (PUT)
function updateEleve(req, res) {
    Eleve.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, eleve) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `${eleve.nom} ${eleve.prenom} mis à jour` });
    });
}

// Suppression d'un élève (DELETE)
function deleteEleve(req, res) {
    Eleve.findByIdAndRemove(req.params.id, (err, eleve) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `${eleve.nom} ${eleve.prenom} supprimé` });
    });
}

module.exports = { getEleves, postEleve, getEleve, updateEleve, deleteEleve };
