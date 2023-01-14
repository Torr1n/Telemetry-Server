"use strict";
const express = require('express');
const healthCheck = express.Router();
healthCheck.get('/', (req, res) => {
    return res.status(200).json({ "status": "OK" });
});
module.exports = healthCheck;
