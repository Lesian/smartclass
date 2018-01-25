// dependencies
const express = require('express');

// models
const Story = require('../models/story');
const Comment = require('../models/comment');

const router = express.Router();

// api endpoints
router.get('/whoami', function(req, res) {
    res.send({
         _id: 'anonid',
        name: 'Anonymous',
        last_post: 'Anon was here'
    });
});

router.get('/user', function(req, res) {
    res.send({
         _id: 'anonid',
        name: 'Anonymous',
        last_post: 'Anon was here'
    });
});


router.get('/stories', function(req, res) {
    Story.find({}, function(err, stories) {
        res.send(stories);
    });
});

router.post('/story', function(req, res) {
    // CODE TGT: Create a new story with the "content" parameter
    // Question: Do we get content with req.body.content or req.query.content? 
    // req.body because this is a post request
    const newStory = new Story({
        'creator_id': 'anonid',
        'creator_name': 'Anonymous',
        'content': req.body.content
    });
    // Save the story
    newStory.save(function(err, story) {
        if (err) console.log(err);
    });
    // Send an empty response
    res.send({});
});

router.get('/comment', function(req, res) {
    // CODE TGT: Fetch the comments that have the parent given in the "parent" parameter
    // Question: Do we get parent with req.body.parent or req.query.parent?
    Comment.find({ parent: req.query.parent }, function(err, comments) {
        res.send(comments);
    });
});

router.post('/comment', function(req, res) {
    // CODE: populate the parent and content keys below
    const newComment = new Comment({
        'creator_id':'anonid',
        'creator_name':'Anonymous',
        'parent': req.body.parent, 
        'content': req.body.content 
    });

    // CODE: save the comment
    newComment.save(function(err, comment) {
        if (err) console.log(err);
    });
    
    res.send({});
});

module.exports = router;
