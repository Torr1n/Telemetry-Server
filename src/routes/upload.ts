import { Request, Response } from "express"

const express = require('express')
const upload = express.Router()
var fs = require("fs");

upload.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.files);
    var stream = fs.createReadStream(req.files);
    stream.pipe(res);
})

export = upload