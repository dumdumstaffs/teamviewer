import { Request } from "express"
import { UnauthorizedError } from "../error"

export function getEmailFromHeaders(req: Request): string {
    try {
        const token = req.headers["authorization"]
        if (typeof token !== "string") throw new Error()

        const encodedEmail = token.split("Bearer ")[1]
        if (!encodedEmail) throw new Error()

        return Buffer.from(encodedEmail, "base64").toString()
    } catch (err) {
        throw new UnauthorizedError()
    }
}
