"use strict";
var express = require("express");
var users_1 = require("./users");
var posts_1 = require("./posts");
var comments_1 = require("./comments");
var router = express.Router();
router.use('/users', users_1.users);
router.use('/posts', posts_1.posts);
router.use('/comments', comments_1.comments);
router.get('*', function (req, res) {
    res.json({ info: 'empty' });
});
exports.controllers = router;
