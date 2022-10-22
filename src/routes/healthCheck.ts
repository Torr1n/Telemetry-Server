import { Request, Response } from "express"

const express = require('express')
const healthCheck = express.Router()

healthCheck.get('/', (req: Request, res: Response) => {
    return res.status(200).json({"status": "OK"})
})

export = healthCheck