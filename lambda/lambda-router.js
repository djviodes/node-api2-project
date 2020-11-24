const express = require('express');
const Lambda = require('../data/db');

const router = express.Router();

router.get('/api/posts', (req, res) => {
    console.log(req.query);
    Lambda.find(req.query)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message,
                stack: err.stack,
            });
        });
});

module.exports = router;