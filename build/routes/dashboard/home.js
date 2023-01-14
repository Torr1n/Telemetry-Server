"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(require("path"));
const express = require('express');
const download = express.Router();
download.get('/', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname + "/../../public/html/home.html"));
});
module.exports = download;
