import { Router } from "express"
import { NotFoundError } from "../../error"
import { validateBody } from "../../utils/validate"
import { CreateUser, UpdateUser } from "./schema"
import { createUser, getUserById, updateUser } from "./service"

export const router = Router()

router.get("/create", async (req, res, next) => {
    try {
        const userData = await validateBody(req, CreateUser)
        const user = await createUser(userData)

        res.send(user)
    } catch (err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id)
        if (!user) throw new NotFoundError("User not found")

        res.send(user)
    } catch (err) {
        next(err)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id)
        if (!user) throw new NotFoundError("User not found")

        const userData = await validateBody(req, UpdateUser)
        const updatedUser = await updateUser(user.id, userData)

        res.send(updatedUser)
    } catch (err) {
        next(err)
    }
})

