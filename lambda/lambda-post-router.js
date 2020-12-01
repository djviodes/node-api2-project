const express = require('express');
const Lambda = require('../data/db');

const postRouter = express.Router();

postRouter.post('/api/posts', (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({
            errorMessage: "Please provide title for the post."
        });
    } else if (!req.body.contents) {
        return res.status(400).json({
            errorMessage: "Please provide contents for the post."
        });
    } else {
        Lambda.insert(req.body)
            .then(data => {
                res.status(201).json(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: "There was an error while saving the post to the database"
                });
            });
    };

});

postRouter.post('/api/posts/:id/comments', (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({
            errorMessage: "Please provide text for the comment."
        });
    };

    const newComment = { post_id: req.params.id, ...req.body }

    Lambda.insertComment(newComment)
        .then(data => {
            res.status(201).json(data); 
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "There was an error while saving the comment to the database"
            });
        });
});

module.exports = postRouter;