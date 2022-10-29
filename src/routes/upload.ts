import { Request, Response } from "express"

const express = require('express')
const upload = express.Router()
var fs = require("fs");

upload.post('/', (req: Request, res: Response) => {
    console.log(req.body);
})

export = upload