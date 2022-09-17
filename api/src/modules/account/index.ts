import { Router } from "express"
import { getTokenFromHeaders } from "../../utils/auth"
import { getUserById } from "../users/service"

export const router = Router()

router.get("/", async (req, res, next) => {
    try {
        const token = getTokenFromHeaders(req)
        const user = await getUserById(token)

        res.send(user)
    } catch (err) {
        next(err)
    }
})