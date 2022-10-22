"use strict";
exports.__esModule = true;
var express = require("express");
var helloworld = require("./routes/helloworld");
var bigfile = require("./routes/bigfile");
var healthCheck = require("./routes/healthCheck");
var app = express();
var port = 3000;
// routes
app.use("/api/v1/helloworld", helloworld);
app.use("/api/v1/healthcheck", healthCheck);
app.use("/api/v1/big-file", bigfile);
var start = function () {
    app.listen(port, function () {
        return console.log("Server is listening on port ".concat(port, "..."));
    });
};
start();
