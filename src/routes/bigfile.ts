import { Request, Response } from "express";

const express = require('express')
const fs = require('fs');
const bigfile = express.Router()

bigfile.get('/', (req: Request, res: Response) => {
    const src = fs.createReadStream('src/big.file');
    src.pipe(res);
  })

  export = bigfile;