"use strict";
var express = require("express");
var fs = require("fs");
var bigfile = express.Router();
bigfile.get("/", function (req, res) {
  var src = fs.createReadStream("src/big.file");
  src.pipe(res);
});
module.exports = bigfile;
