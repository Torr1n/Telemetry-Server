import { Request, Response } from "express"

const express = require('express')
const download = express.Router()
var fs = require("fs");

download.get('/', (req: Request, res: Response) => {
  var data = "";
    var readerStream = fs.createReadStream("./uploads/data.csv");
    readerStream.setEncoding("UTF8");

    readerStream.on("data", function (chunk: string) {
      data += chunk;
    });

    readerStream.on("end", function () {
      res.status(200).json({ status: "file read", data });
    });

    readerStream.on("error", function (err: any) {
      res.status(400).json({ status: "could not read file" });
    });
})

export = download