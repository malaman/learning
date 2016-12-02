"use strict";
var mongoose = require("mongoose");
var Promise = require("bluebird");
var user_1 = require("../models/user");
var post_1 = require("../models/post");
var comment_1 = require("../models/comment");
var users = require('../fixtures/users.json');
var posts = require('../fixtures/posts.json');
var comments = require('../fixtures/comments.json');
var i = 0;
var last = comments.length;
var conn = mongoose.connect('mongodb://172.18.0.2:27017/test');
try {
    conn.connection.collections['users'].drop();
    conn.connection.collections['posts'].drop();
    conn.connection.collections['comments'].drop();
}
catch (e) { }
var userPromises = users
    .map(function (user) {
    var id = user.id, username = user.username, name = user.name, email = user.email;
    var newUser = new user_1.User({ id: id, username: username, name: name, email: email });
    return newUser.save();
});
Promise.all(userPromises).then(function () {
    var commentPromises = posts.map(function (post) {
        var userId = post.userId, title = post.title, body = post.body;
        return user_1.User.findOne({ id: userId })
            .then(function (user) {
            var newPost = new post_1.Post({ title: title, body: body, _creator: user._id });
            return newPost.save().then(function () {
                var postCommentsIndex = i + 10;
                for (i; i < postCommentsIndex && i < last; i++) {
                    var _a = comments[i], body_1 = _a.body, email = _a.email;
                    var newComment = new comment_1.Comment({ _post: newPost._id, body: body_1, email: email });
                    return newComment.save();
                }
            });
        });
    });
    Promise.all(commentPromises).then(function () {
        console.log('length', commentPromises.length);
        console.log('DB population is completed!');
        process.exit();
    });
});
