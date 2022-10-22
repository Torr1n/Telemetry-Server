"use strict";
exports.__esModule = true;
var express = require("express");
var helloworld = require("./routes/helloworld");
var bigfile = require("./routes/bigfile");
var healthCheck = require("./routes/healthcheck");
var app = express();
var port = 3000;
// routes
app.use("/api/helloworld", helloworld);
app.use("/api/big-file", bigfile);
app.use("/api/v1/healthcheck", healthCheck);
var start = function () {
    app.listen(port, function () {
        return console.log("Server is listening on port ".concat(port, "..."));
    });
};
start();
