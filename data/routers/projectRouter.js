const express = require('express');

const router = express.Router();

router.use(express.json());

const projects = require('../helpers/projectModel');

// ----------------------------------------------------

// CRUD OPERATIONS BELOW...

// POST -- Add a project to the project database -- CREATE

router.post('/', (req, res) => {
    projects.insert(req.body)
    .then(proj => {
        res.status(201).json(proj)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: 'The Project could not be added'
        });
    });
});

// GET - Get a list of projects from the project database -- READ

router.get('/', (req, res) => {
    projects.get()
    .then(proj => {
        res.status(200).json(proj)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: 'The projects could not be retrieved'
        });
    });
});

// GET - Get a specific project from the database based on the ID passed to the URL --- READ

router.get('/:id', (req, res) => {
    const id = req.params.id;
    projects.get(id)
    .then(proj => {
        if (id) {
            res.status(200).json(proj)
        }
        else if (!id) {
            res.status(404).json({
                errorMessage: 'The project with the specified ID could not be found'
            })
        }
        else {
            res.status(500).json({
                errorMessage: 'The project could not be retrieved from the database'
            })
        }
    });
});

// GET - Get actions for a specific project by passing in the project ID

router.get('/:id/actions', (req, res) => {
    projects.getProjectActions(req.params.id)
    .then(actions => {
        if (!actions) {
            res.status(404).json({
                errorMessage: 'The action with the specified project ID does not exist'
            })
        }
        else if (actions) {
            res.status(200).json(actions)
        }
        else {
            res.status(500).json({
                errorMessage: 'The actions information could not be retrieved'
            })
        }
    });
});

// PUT -- Update a project in the project database -- UPDATE

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedProject = req.body
    projects.update(id, updatedProject)
    .then(proj => {
        res.status(200).json(proj)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            errorMessage: 'The project could not be updated'
        });
    });
});

// DELETE -- Delete a project in the project database -- DELETE

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    projects.remove(id)
    .then(proj => {
        res.status(204).json({
            message: 'Project successfully deleted!'
        })
    })
    .catch(error => {
        console.log(error)
        res.status(404).json({
            errorMessage: 'The specified project ID does not exist'
        })
    });
});


// Custom Middleware

// function validateProjectId(req, res, next) {
//     projects.get(req.params.id)
//     .then(proj => {
//         if (proj) {
//             req.proj = proj
//             next();
//         }
//         else {
//             res.status(400).json({
//                 message: 'Invalid Project ID'
//             })
//         }
//     });
// };

module.exports = router;