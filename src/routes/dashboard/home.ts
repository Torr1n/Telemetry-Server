import { Request, Response } from "express"
import path from "path"

const express = require('express')
const download = express.Router()

download.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname + "/../../public/html/home.html"));
})

export = download