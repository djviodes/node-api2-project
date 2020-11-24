const express = require('express');
const lambdaRouter = require('./lambda/lambda-router');
const lambdaPostRouter = require('./lambda/lambda-post-router');

const server = express();

server.use(express.json());
server.use(lambdaRouter);
server.use(lambdaPostRouter);

server.get('/', (req, res) => {
    res.send(`
        <h2>David Lambda API</h2>
        <p>Welcome to the David Lambda API</p>
    `);
});

module.exports = server;