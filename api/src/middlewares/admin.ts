import { RequestHandler } from "express";
import { UnauthorizedError } from "../error";
import { getUserByEmail } from "../modules/users/service";
import { getEmailFromHeaders } from "../utils/auth";

export const admin: RequestHandler = async (req, _res, next) => {
    try {
        const email = getEmailFromHeaders(req)
        const user = await getUserByEmail(email)

        if (user && user.isAdmin) {
            return next()
        }

        throw new Error()
    } catch (err) {
        next(new UnauthorizedError())
    }
}
