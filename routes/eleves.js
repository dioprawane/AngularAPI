const assignment = require('../model/assignment');
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
    let eleveId = req.params.idEleve;

    Eleve.findOne({ _id: eleveId }, (err, eleve) => {
        if (err) { res.send(err) }
        res.json(eleve);
    });
}

// Ajout d'un élève (POST)
function postEleve(req, res) {
    let eleve = new Eleve();
    eleve.idEleve = req.body.idEleve;
    eleve.nom = req.body.nom;
    eleve.prenom = req.body.prenom;
    eleve.note = req.body.note;
    eleve.assignments = req.body.assignments;
    eleve.matieres = req.body.matieres;

    console.log("POST eleve reçu :");
    console.log(eleve)

    eleve.save((err) => {
        if (err) {
            res.send('cant post élève', err);
        }
        res.json({ message: `${eleve.nom} ${eleve.prenom} enregistré !` });
    });
}

// Update d'un élève (PUT)
function updateEleve(req, res) {
    console.log("UPDATE recu eleve : ");
    console.log(req.body);
    Eleve.findByIdAndUpdate(req.params._id, req.body, { new: true }, (err, eleve) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json({ message: `${eleve.nom} ${eleve.prenom} mis à jour` });
    });
}

// Suppression d'un élève (DELETE)
function deleteEleve(req, res) {
    Eleve.findByIdAndRemove(req.params.idEleve, (err, eleve) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `${eleve.nom} ${eleve.prenom} supprimé` });
    });
}

module.exports = { getEleves, postEleve, getEleve, updateEleve, deleteEleve };
