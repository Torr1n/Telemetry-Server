import { Request, Response } from "express"

const express = require('express')
const helloworld = express.Router()

helloworld.get('/', (req: Request, res: Response) => {
    return res.send("hello world")
})

export = helloworld

