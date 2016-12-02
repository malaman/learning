"use strict";
var express = require("express");
var comment_1 = require("../models/comment");
var router = express.Router();
router.get('/', function (req, res) {
    var response = [];
    comment_1.Comment.find({}, function (err, comments) {
        if (err) {
            return res.json(response);
        }
        res.json(comments);
    });
});
router.post('/', function (req, res) {
    var _a = req.body, _creator = _a._creator, _post = _a._post, email = _a.email, body = _a.body;
    if (_creator && _post && email && body) {
        var comment_2 = new comment_1.Comment({ _creator: _creator, _post: _post, email: email, body: body });
        comment_2.save(function (err) {
            if (err) {
                return res.json({ error: "comment saving error: " + err });
            }
            res.json({ _id: comment_2._id });
        });
    }
    else {
        res.json({ post: 'comment saving error' });
    }
});
exports.comments = router;
