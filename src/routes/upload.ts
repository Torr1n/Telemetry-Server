import { Request, Response } from "express"
const express = require('express')
const upload = express.Router()
var fs = require("fs");

let cachingUploader = (cache: any) => {

  return upload.post('/', (req: Request, res: Response) => {
    fs.appendFileSync("./uploads/data.csv", req.body.data);
    req.body.data.split("\n").forEach((row: string) => {
      cache.data.push(row);
    });
   
    console.log(cache);
    res.sendStatus(200);
  });

}



export = cachingUploader