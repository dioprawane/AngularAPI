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
    let matiereId = req.params.idMatiere;

    Matiere.findOne({ _id: matiereId }, (err, matiere) => {
        if (err) { res.send(err) }
        res.json(matiere);
    });
}

// Ajout d'une matière (POST)
function postMatiere(req, res) {
    let matiere = new Matiere();
    matiere.idMatiere = req.body.idMatiere;
    matiere.nom = req.body.nom;
    matiere.enseignant = req.body.enseignant;
    matiere.imageMatiere = req.body.imageMatiere;
    matiere.imageProf = req.body.imageProf;
    matiere.assignments = req.body.assignments;
    matiere.eleves = req.body.eleves;

    console.log("POST matiere reçu :");
    console.log(matiere)

    matiere.save((err) => {
        if (err) {
            res.send('Impossible de poster la matière', err);
        }
        res.json({ message: `${matiere.nom} enregistrée !` });
    });
}

// Update d'une matière (PUT)
function updateMatiere(req, res) {
    console.log("UPDATE recu matiere : ");
    console.log(req.body);
    Matiere.findByIdAndUpdate(req.params._id, req.body, { new: true }, (err, matiere) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `${matiere.nom} mise à jour` });
    });
}

// Suppression d'une matière (DELETE)
function deleteMatiere(req, res) {
    Matiere.findByIdAndRemove(req.params.idMatiere, (err, matiere) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `${matiere.nom} supprimée` });
    });
}

module.exports = { getMatieres, postMatiere, getMatiere, updateMatiere, deleteMatiere };
