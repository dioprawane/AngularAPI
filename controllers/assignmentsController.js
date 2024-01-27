const Assignment = require('./../model/assignment.js');
const Matiere = require('./../model/matiere.js');
const Eleve = require('./../model/eleve.js');

export async function assignmentControllerCreate(req, res, next) {
    try {
        const a = req.body;
        const newAssignment = await Assignment.create(a);

        // Mise à jour des Eleves et Matiere avec la nouvelle tâche
        if (newAssignment.eleves && newAssignment.eleves.length) {
            await Eleve.updateMany({ '_id': { $in: newAssignment.eleves } }, { $push: { assignments: newAssignment._id } });
        }
        if (newAssignment.matiere) {
            await Matiere.updateOne({ '_id': newAssignment.matiere }, { $push: { assignments: newAssignment._id } });
        }

        return res.send(newAssignment);
    } catch (error) {
        // Gestion des erreurs
        return res.status(500).send({ message: "Erreur lors de la création de l'assignment", error: error });
    }
}

export async function assignmentControllerIndex(req, res, next) {
    try {
        const assignments = await Assignment.find().populate("eleves").populate("matiere");
        return res.send(assignments);
    } catch (error) {
        return res.status(500).send({ message: "Erreur lors de la récupération des assignments", error: error });
    }
}
