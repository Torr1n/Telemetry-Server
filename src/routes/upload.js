"use strict";
var busboy = require("busboy");
var express = require('express');
var upload = express.Router();
var fs = require("fs");
upload.post('/', function (req, res) {
    var bb = busboy({ headers: req.headers });
    if (fs.existsSync('./uploads/data.csv')) {
        bb.on("file", function (name, file, info) {
            file.pipe(fs.createWriteStream("./uploads/data.csv", { flags: 'a' }));
        });
    }
    else {
        bb.on("file", function (name, file, info) {
            file.pipe(fs.createWriteStream("./uploads/data.csv"));
        });
    }
    bb.on("close", function () {
        res.status(200).json({ status: "file recieved" });
    });
    req.pipe(bb);
});
module.exports = upload;
