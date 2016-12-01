"use strict";
var mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");
var index_1 = require("./controllers/index");
var port = 3030;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', index_1.controllers);
app.listen(port, '0.0.0.0', function () {
    console.log('Listening on port ' + port);
});
mongoose.connect('mongodb://172.18.0.2:27017/test');
