import { Router } from "express"
import { getEmailFromHeaders } from "../../utils/auth"
import { getUserByEmail } from "../users/service"

export const router = Router()

router.get("/", async (req, res, next) => {
    try {
        const email = getEmailFromHeaders(req)
        const user = await getUserByEmail(email)

        res.send(user)
    } catch (err) {
        next(err)
    }
})