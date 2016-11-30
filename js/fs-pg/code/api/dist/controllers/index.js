"use strict";
var express = require("express");
var users_1 = require("./users");
var router = express.Router();
router.use('/users', users_1.users);
router.get('*', function (req, res) {
    res.json({ info: 'empty' });
});
exports.controllers = router;
