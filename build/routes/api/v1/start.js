"use strict";
const express = require('express');
const upload = express.Router();
let starter = (startRun) => {
    return upload.post('/', (req, res) => {
        startRun(req.body.runId);
        res.sendStatus(200);
    });
};
module.exports = starter;
