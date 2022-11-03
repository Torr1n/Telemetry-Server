"use strict";
var express = require('express');
var download = express.Router();
var fs = require("fs");
download.get('/', function (req, res) {
    var data = "";
    var readerStream = fs.createReadStream("./uploads/data.csv");
    readerStream.setEncoding("UTF8");
    readerStream.on("data", function (chunk) {
        data += chunk;
    });
    readerStream.on("end", function () {
        res.status(200).json({ status: "file read", data: data });
    });
    readerStream.on("error", function (err) {
        res.status(400).json({ status: "could not read file" });
    });
});
module.exports = download;
