let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}

// Récupérer un assignment par son _id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({_id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    });
}


// Ajout d'un assignment (POST)
/*function postAssignment(req, res) {
    let assignment = new Assignment({
        id: req.body.id,
        nom: req.body.nom,
        dateDeRendu: req.body.dateDeRendu,
        rendu: req.body.rendu,
        remarque: req.body.remarque,
        eleves: req.body.eleves,
        matiere: req.body.matiere
    });

    console.log("POST assignment reçu :");
    console.log(assignment);

    assignment.save((err, savedAssignment) => {
        if (err) {
            console.error('Erreur lors de l’enregistrement de l’assignment:', err);
            return res.status(500).send('Erreur lors de l’enregistrement de l’assignment');
        }
        res.status(201).json(savedAssignment);
    });
}*/
function postAssignment(req, res) {
    let assignment = new Assignment(req.body);
    
    assignment.save((err) => {
      if (err) {
        res.send('cant post assignment ', err);
      }
      res.json({ message: `${assignment.nom} saved!`});
    });
  }
  


// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}

module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
