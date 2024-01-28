let Assignment = require('../model/assignment');
const Counters = require('../model/Counters');

// Récupérer tous les assignments (GET)
async function getAssignments(req, res) {
    try {
        // Récupérer les paramètres de pagination de la requête
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        // Calculer le nombre total d'assignments
        const totalCount = await Assignment.countDocuments();

        // Trouver les assignments avec une pagination
        Assignment.find()
            .skip((page - 1) * limit) // Ignorer les N premiers documents
            .limit(limit) // Limiter le résultat à 'limit' documents
            .exec((err, assignments) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json({
                        total: totalCount,
                        page: page,
                        pageSize: assignments.length,
                        assignments: assignments
                    });
                }
            });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur lors de la récupération des assignments", error: error.message });
    }
}

/*
Assignment.find((err, assignments) => {
            if(err){
                res.send(err)
            }
    
            res.send(assignments);
        });
*/


// Récupérer un assignment par son _id (GET)
async function getAssignment(req, res){
    let assignmentId = req.params._id;

    try {
        const assignment = await Assignment.findById(assignmentId);
        if (assignment) {
            res.json(assignment);
        } else {
            res.status(404).json({ message: 'Assignment non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'assignment', err });
    }
}

// Ajout d'un assignment (POST)
async function postAssignment(req, res) {
    try {
        let assignment = new Assignment(req.body);
        console.log(assignment);
        /*console.log('matiere body',req.body.matiere);
        assignment.matiere = req.body.matiere;
        console.log('assignment matiere',assignment.matiere);*/
        const savedAssignment = await assignment.save();
        res.status(201).json(savedAssignment);
    } catch (error) {
        console.error('Erreur lors de l\'ajout des assignments:', error);
        res.status(500).json({ message: 'Erreur serveur pour postAssignment', error });
    }
    /*try {
        let assignment = new Assignment();
        assignment.id = await getNextSequence('assignmentId');
        assignment.nom = req.body.nom;
        assignment.dateDeRendu = req.body.dateDeRendu;
        assignment.rendu = req.body.rendu;
        assignment.remarque = req.body.remarque;
        assignment.eleves = req.body.eleves;
        assignment.matiere = req.body.matiere;

        console.log(assignment);

        await Assignment.save(assignment);

        res.status(201).json(assignment);
    } catch (error) {
        console.error('Erreur lors de l\'ajout des assignments:', error);
        res.status(500).json({ message: 'Erreur serveur pour postAssignment' });
    }*/
}

async function getNextSequence(name) {
    const counter = await Counters.findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return counter.seq;
}

// Update d'un assignment (PUT)
async function updateAssignment(req, res) {
    try {
        const updatedAssignment = await Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true });
        if (updatedAssignment) {
            res.json(updatedAssignment);
        } else {
            res.status(404).json({ message: 'Assignment non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'assignment', err });
    }
}

// Suppression d'un assignment (DELETE)
async function deleteAssignment(req, res) {
    try {
        const deletedAssignment = await Assignment.findByIdAndRemove(req.params.id);
        if (deletedAssignment) {
            res.json({ message: 'Assignment supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Assignment non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'assignment', err });
    }
}

module.exports = { getAssignments, getAssignment, postAssignment, updateAssignment, deleteAssignment };
