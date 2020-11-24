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
                error: "The posts information could not be retrieved."
            });
        });
});

router.get('/api/posts/:id', (req, res) => {
    Lambda.findById(req.params.id)
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "The post information could not be retrieved."
            });
        });
});

router.get('/api/posts/:id/comments', (req, res) => {
    Lambda.findPostComments(req.params.id)
        .then(data => {
            if (!data.length) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                });
            } else {
                res.status(200).json(data);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "The comments information could not be retrieved."
            });
        });
});

router.put('/api/posts/:id', (req, res) => {
    const changes = req.body;
    Lambda.update(req.params.id, changes)
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else if (!data.title && !data.contents) {
                res.status(400).json({
                    errorMessage: "Please provide title and contents for the post."
                });
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "The post information could not be modified."
            })
        })
})

module.exports = router;