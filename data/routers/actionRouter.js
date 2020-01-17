const express = require('express');

const router = express.Router();

router.use(express.json());

const actions = require('../helpers/actionModel');



// CRUD OPERATIONS BELOW...

// GET - Get a list of actions from the actions database

router.get('/', (req, res) => {
    actions.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: 'The actions data could not be retrieved'
        })
    });
});

// POST -- Add an action to a specific project in the database -- CREATE

router.post('/:id', (req, res) => {  
    actions.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(error => {
        console.log(error)
        res.status(404).json({
            errorMessage: 'Specified project ID could not be found'
        })
    });
});

// PUT -- Update an action in the project database by specifying a specific action ID -- UPDATE

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedAction = req.body
    actions.update(id, updatedAction)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            errorMessage: 'The action could not be updated'
        });
    });
});

// DELETE -- Delete an action in the project database by -- DELETE

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    actions.remove(id)
    .then(action => {
        res.status(204).json(action)
    })
    .catch(error => {
        console.log(error)
        res.status(404).json({
            errorMessage: 'Specified action ID could not be found'
        })
    });
});

module.exports = router;