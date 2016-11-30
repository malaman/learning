"use strict";
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});
var postSchema = new mongoose.Schema({
    _creator: { type: Number, ref: 'User' },
    title: String,
    body: String
});
var User = mongoose.model('User', userSchema);
var Post = mongoose.model('Post', postSchema);
var newUser = new User({
    name: 'Andrii',
    email: 'none@none.com'
});
newUser.save(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('newUser: ', newUser);
    }
});
