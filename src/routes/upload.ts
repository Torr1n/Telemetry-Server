import { Request, Response } from "express"
const busboy = require("busboy");
const express = require('express')
const upload = express.Router()
var fs = require("fs");


upload.post('/', (req: Request, res: Response) => {
    const bb = busboy({ headers: req.headers });

          if (fs.existsSync('./uploads/data.csv')) {
            bb.on("file", (name: any, file: { pipe: (arg0: any) => void; }, info: any) => {
                file.pipe(fs.createWriteStream("./uploads/data.csv", {flags: 'a'}));
              })
          } else {
            bb.on("file", (name: any, file: { pipe: (arg0: any) => void; }, info: any) => {
                file.pipe(fs.createWriteStream("./uploads/data.csv"));
              })
          }

  bb.on("close", () => {
    res.status(200).json({ status: "file recieved" });
  });
  req.pipe(bb);
})

export = upload