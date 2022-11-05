"use strict";
var express = require('express');
var download = express.Router();
var fs = require("fs");
var cachingDownloader = function (cache) {
    return download.get('/', function (req, res) {
        var data = cache.data;
        res.status(200).json({ status: "file read", data: data });
    });
};
module.exports = cachingDownloader;
