import { RequestHandler } from "express";
import { getEmailFromHeaders } from "../utils/auth";

export const auth: RequestHandler = (req, _res, next) => {
    getEmailFromHeaders(req)
    next()
}
