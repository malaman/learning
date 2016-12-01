"use strict";
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});
exports.User = mongoose.model('User', UserSchema);
