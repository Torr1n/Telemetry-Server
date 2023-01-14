import { Request, Response } from "express"
const express = require('express')
const upload = express.Router()

let starter = (startRun: any) => {

  return upload.post('/', (req: Request, res: Response) => {
    startRun(req.body.runId);
    res.sendStatus(200);
  });

}

export = starter;