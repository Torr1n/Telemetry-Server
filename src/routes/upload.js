"use strict";
var express = require('express');
var upload = express.Router();
var fs = require("fs");
var cachingUploader = function (cache) {
    return upload.post('/', function (req, res) {
        fs.appendFileSync("./uploads/data.csv", req.body.data);
        req.body.data.split("\n").forEach(function (row) {
            cache.data.push(row);
        });
        console.log(cache);
        res.sendStatus(200);
    });
};
module.exports = cachingUploader;
