const express = require('express');

const server = express();

// Establishing Routers

const actionRouter = require('./data/routers/actionRouter');

const projectRouter = require('./data/routers/projectRouter');

// Logger Middleware


// ------- End

// Bringing the routers into the server

server.use('/api/actions', actionRouter)

server.use('/api/projects', projectRouter)

server.use(express.json());

// ------- End

server.get('/', (req, res) => {
    res.send(`<h1>Let's build an API :)<h1>`)
});

// Custom global middleware

// ------- End

module.exports = server;

