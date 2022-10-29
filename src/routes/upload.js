"use strict";
var express = require('express');
var upload = express.Router();
var fs = require("fs");
upload.post('/', function (req, res) {
    console.log(req.body);
    var stream = fs.createReadStream(req.body);
    stream.pipe(res);
});
module.exports = upload;
