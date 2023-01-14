"use strict";
const express = require('express');
const upload = express.Router();
let cachingUploader = (uploadRun) => {
    return upload.post('/', (req, res) => {
        uploadRun(req.body.data);
        res.sendStatus(200);
    });
};
module.exports = cachingUploader;
