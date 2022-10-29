"use strict";
var express = require('express');
var upload = express.Router();
var fs = require("fs");
upload.post('/', function (req, res) {
    console.log(req.body);
});
module.exports = upload;
