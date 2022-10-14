"use strict";
var express = require('express');
var helloworld = express.Router();
helloworld.get('/', function (req, res) {
    return res.send("hello world");
});
module.exports = helloworld;
