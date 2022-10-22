import { Request, Response } from "express"

const express = require('express')
const upload = express.Router()
var fs = require("fs");

upload.post('/', (req: Request, res: Response) => {
    var stream = fs.createReadStream(req.body);
    stream.pipe(res);
})

export = upload