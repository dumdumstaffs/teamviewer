import { RequestHandler } from "express";
import { UnauthorizedError } from "../error";
import { getUserById } from "../modules/users/service";
import { getTokenFromHeaders } from "../utils/auth";

export const auth: RequestHandler = async (req, _res, next) => {
    try {
        const token = getTokenFromHeaders(req)
        const user = await getUserById(token)

        if (!user) throw new Error()

        next()
    } catch (err) {
        next(new UnauthorizedError())
    }
}
