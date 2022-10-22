"use strict";
var express = require('express');
var fs = require('fs');
var bigfile = express.Router();
bigfile.get('/', function (req, res) {
    var stream = fs.createWriteStream;
});
module.exports = bigfile;
