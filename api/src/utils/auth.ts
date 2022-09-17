import { Request } from "express"
import { UnauthorizedError } from "../error"

export function getTokenFromHeaders(req: Request): string {
    try {
        const bearerToken = req.headers["authorization"]
        if (typeof bearerToken !== "string") throw new Error()

        const token = bearerToken.split("Bearer ")[1]
        if (!token) throw new Error()

        return token
    } catch (err) {
        throw new UnauthorizedError()
    }
}
