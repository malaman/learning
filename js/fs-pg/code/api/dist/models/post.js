"use strict";
var mongoose = require("mongoose");
var postSchema = new mongoose.Schema({
    _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    body: String
});
exports.Post = mongoose.model('Post', postSchema);
