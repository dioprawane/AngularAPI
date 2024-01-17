let Matiere = require('../model/matiere');

// Récupérer toutes les matières (GET)
function getMatieres(req, res) {
    Matiere.find((err, matieres) => {
        if (err) {
            res.send(err);
        }
        res.send(matieres);
    });
}

// Récupérer une matière par son id (GET)
function getMatiere(req, res) {
    let matiereId = req.params.id;

    Matiere.findOne({ _id: matiereId }, (err, matiere) => {
        if (err) { res.send(err) }
        res.json(matiere);
    });
}

// Ajout d'une matière (POST)
function postMatiere(req, res) {
    let matiere = new Matiere(req.body);

    matiere.save((err) => {
        if (err) {
            res.send('Impossible de poster la matière', err);
        }
        res.json({ message: `${matiere.nom} enregistrée !` });
    });
}

// Update d'une matière (PUT)
function updateMatiere(req, res) {
    Matiere.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, matiere) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `${matiere.nom} mise à jour` });
    });
}

// Suppression d'une matière (DELETE)
function deleteMatiere(req, res) {
    Matiere.findByIdAndRemove(req.params.id, (err, matiere) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `${matiere.nom} supprimée` });
    });
}

module.exports = { getMatieres, postMatiere, getMatiere, updateMatiere, deleteMatiere };
