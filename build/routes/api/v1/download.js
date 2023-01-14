"use strict";
const express = require('express');
const download = express.Router();
var fs = require("fs");
let cachingDownloader = (cache) => {
    return download.get('/', (req, res) => {
        let data = cache[`${req.query.runId}.csv`];
        res.status(200).json({ status: "ok", data });
    });
};
module.exports = cachingDownloader;
