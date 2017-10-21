const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const post = require('../models/post');

const db = "mongodb://[username]:[password]@ds123725.mlab.com:23725/codepost"

mongoose.Promise = global.Promise;
mongoose.connect(db, function(err) {
  if(err) {
    console.log('Connection error');
  }
});

router.get('/posts', function(req, res) {
  console.log('Requesting posts');
  post.find({})
    .exec(function(err, posts) {
      if (err) {
        console.log('Error getting the posts');
      } else {
        res.json(posts);
      }
    });
});

router.get('/details/:id', function(req, res) {
  console.log('Requesting post');
  post.findById(req.params.id)
    .exec(function(err, post) {
      if (err) {
        console.log('Error getting the post');
      } else {
        res.json(post);
      }
    });
});

router.post('/posts', function(req, res) {
  console.log('Posting a post');
  var newPost = new post();
  newPost.title = req.body.title;
  newPost.url = req.body.url;
  newPost.description = req.body.description;
  newPost.save(function(err, addedPost) {
    if (err) {
      console.log('Error inserting the Post');
    } else {
        res.json(addedPost);
      }
    });
});
module.exports = router;