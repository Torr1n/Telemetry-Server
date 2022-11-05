import { Request, Response } from "express"

const express = require('express')
const download = express.Router()
var fs = require("fs");
let cachingDownloader = (cache: any) => {
  return download.get('/', (req: Request, res: Response) => {
    let data = cache.data;
        res.status(200).json({ status: "file read", data});
  })
}

export = cachingDownloader