import { Request, Response } from "express"

const express = require('express')
const upload = express.Router()
var fs = require("fs");

upload.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).json({ status: "file recieved" })
})

export = upload