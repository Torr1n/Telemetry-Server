import { Request, Response } from "express";

const express = require('express')
const fs = require('fs');
const bigfile = express.Router()

bigfile.get('/', (req: Request, res: Response) => {
    const stream = fs.createWriteStream

  })

  export = bigfile;