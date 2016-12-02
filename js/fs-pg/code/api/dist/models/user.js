"use strict";
var mongoose = require("mongoose");
var AutoIncrement = require('mongoose-sequence');
var UserSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String
});
UserSchema.plugin(AutoIncrement, { inc_field: 'id', disable_hooks: true });
exports.User = mongoose.model('User', UserSchema);
