"use strict";
var express = require("express");
var healthCheck = express.Router();
healthCheck.get("/", function (req, res) {
  return res.status(200).json({ status: "OK" });
});
module.exports = healthCheck;
