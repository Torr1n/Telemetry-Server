import { Request, Response } from "express"

const express = require('express')
const download = express.Router()
var fs = require("fs");
let cachingDownloader = (cache: any) => {
  return download.get('/', (req: Request, res: Response) => {
    let data = cache[`${req.query.runId}.csv`];
    res.status(200).json({ status: "ok", data});
  })
}

export = cachingDownloader