"use strict";
exports.__esModule = true;
var express = require("express");
var helloworld = require("./routes/helloworld");
var bigfile = require("./routes/bigfile");
var fs = require("fs");
var healthCheck = require("./routes/healthcheck");
var upload = require("./routes/upload");
var download = require("./routes/download");
var app = express();
var port = 3000;
//middleware
app.use(express.json());
var cache = {};
cache.data = [];
// routes
app.use("/api/helloworld", helloworld);
app.use("/api/big-file", bigfile);
app.use("/api/v1/healthcheck", healthCheck);
app.use("/api/v1/upload", upload(cache));
app.use("/api/v1/download", download(cache));
var start = function () {
  // read from the data file if it exists, and add it's contents to the cache above
  if (fs.existsSync("./uploads/data.csv")) {
    fs.readFileSync("./uploads/data.csv", "utf8")
      .split("\n")
      .forEach(function (row) {
        cache.data.push(row);
      });
  }
  app.listen(port, function () {
    return console.log("Server is listening on port ".concat(port, "..."));
  });
};
start();
