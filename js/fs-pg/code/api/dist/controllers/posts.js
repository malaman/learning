"use strict";
var express = require("express");
var post_1 = require("../models/post");
var router = express.Router();
router.get('/', function (req, res) {
    var response = [];
    post_1.Post.find({}, function (err, posts) {
        if (err) {
            return res.json(response);
            ;
        }
        res.json(posts);
    });
});
router.post('/', function (req, res) {
    var _a = req.body, _creator = _a._creator, title = _a.title, body = _a.body;
    console.log('req.body', req.body);
    if (_creator && title && body) {
        var post_2 = new post_1.Post({ _creator: _creator, title: title, body: body });
        post_2.save(function (err) {
            if (err) {
                return res.json({ error: "post saving error: " + err });
            }
            res.json({ _id: post_2._id });
        });
    }
    else {
        res.json({ post: 'post saving error' });
    }
});
router.get('/:id', function (req, res) {
    var response = {};
    post_1.Post
        .findOne({ _id: req.params.id })
        .populate('_creator')
        .exec(function (err, user) {
        if (err) {
            return res.json(response);
            ;
        }
        res.json(user);
    });
});
exports.posts = router;
