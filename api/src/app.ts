import cors from "cors";
import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import * as db from "./db";
import { ServerError } from "./error";
import * as modules from "./modules";

dotenv.config()
db.connectDb()

export const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))

app.get("/", (req, res) => {
    return res.send({ message: "hi" })
});

app.use(modules.router)

app.use((_req, _res) => {
    throw new ServerError(404, "Not Found")
})

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.log(err)
    if (err instanceof ServerError) {
        return res.status(err.status).send(err)
    }

    res.status(500).send({
        status: 500,
        message: "Something went wrong",
    });
});