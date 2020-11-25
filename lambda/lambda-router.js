const express = require('express');
const Lambda = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: `Welcome ${process.env.COHORT}`,
        fact: process.env.FUN_FACT || 'I have no fun facts.'
    });
});

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
            if (data.length > 0) {
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
            if (data.length <= 0) {
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
    // console.log(req.params.id)
    // console.log(req.body)
    const changes = req.body;
    if (!req.body.title) {
        res.status(400).json({
            errorMessage: "Please provide title for the post."
        });
    } else if (!req.body.contents) {
        res.status(400).json({
            errorMessage: "Please provide contents for the post."
        });
    } else {
        Lambda.update(req.params.id, changes)
            .then(data => {
                if (data > 0) {
                    res.status(200).json(changes);
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
                });
            });
    }
});

router.delete('/api/posts/:id', (req, res) => {
    Lambda.remove(req.params.id)
        .then(data => {
            if (data > 0) {
                res.status(200).json({
                    message: "The post has been successfully deleted."
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
                error: "The post could not be removed"
            });
        });
});

module.exports = router;