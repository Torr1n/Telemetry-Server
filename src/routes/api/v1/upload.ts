import { Request, Response } from "express"
const express = require('express')
const upload = express.Router()

let cachingUploader = (uploadRun: any) => {

  return upload.post('/', (req: Request, res: Response) => {
    uploadRun(req.body.data);
    res.sendStatus(200);
  });

}

export = cachingUploader;