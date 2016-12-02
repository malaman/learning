"use strict";
var express = require("express");
var user_1 = require("../models/user");
var post_1 = require("../models/post");
var router = express.Router();
router.get('/', function (req, res) {
    var response = [];
    user_1.User.find({}, function (err, users) {
        if (err) {
            return res.json(response);
        }
        res.json(users);
    });
});
router.post('/', function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email;
    if (name && email) {
        var user_2 = new user_1.User({ name: name, email: email });
        user_2.save(function (err) {
            if (err) {
                return res.json({ error: "user saving error: " + err });
            }
            res.json({ _id: user_2._id });
        });
    }
    else {
        res.json({ error: 'user saving error' });
    }
});
router.get('/:id', function (req, res) {
    var response = {};
    user_1.User.findOne({ _id: req.params.id }, function (err, user) {
        if (err) {
            return res.json(response);
        }
        res.json(user);
    });
});
router.get('/:id/posts', function (req, res) {
    var response = [];
    post_1.Post.find({ _creator: req.params.id }, function (err, posts) {
        if (err) {
            return res.json(response);
        }
        return res.json(posts);
    });
});
exports.users = router;
