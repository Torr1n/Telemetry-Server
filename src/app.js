"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = 3000;
// Hello World
app.get("/", function (req, res) {
    res.send("Hello world");
});
var start = function () {
    app.listen(port, function () {
        return console.log("Server is listening on port ".concat(port, "..."));
    });
};
start();
