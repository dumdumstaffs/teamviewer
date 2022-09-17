import { RequestHandler } from "express";
import { UnauthorizedError } from "../error";
import { getUserById } from "../modules/users/service";
import { getTokenFromHeaders } from "../utils/auth";

export const admin: RequestHandler = async (req, _res, next) => {
    try {
        const token = getTokenFromHeaders(req)
        const user = await getUserById(token)

        if (user && user.isAdmin) return next()

        throw new Error()
    } catch (err) {
        next(new UnauthorizedError())
    }
}
