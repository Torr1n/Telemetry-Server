import { Request, Response } from "express"

const express = require('express')
const download = express.Router()
var fs = require("fs");

download.get('/', (req: Request, res: Response) => {
    var file = fs.createWriteStream("../downloaded.data");
    req
  .on('data',(chunk: any) => {
    file.write(chunk);
  })
  .on('error', (err_msg: any) => {
    console.log(err_msg);
    file.end(err_msg);
  })
  .on('end', () => {
    file.end();
  });
})

export = download