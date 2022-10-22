"use strict";
var express = require('express');
var download = express.Router();
var fs = require("fs");
download.get('/', function (req, res) {
    var file = fs.createWriteStream("../downloaded.data");
    req
        .on('data', function (chunk) {
        file.write(chunk);
    })
        .on('error', function (err_msg) {
        console.log(err_msg);
        file.end(err_msg);
    })
        .on('end', function () {
        file.end();
    });
});
module.exports = download;
