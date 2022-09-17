import { Router } from "express"
import { NotFoundError } from "../../error"
import { User } from "../../models/user"
import { getTokenFromHeaders } from "../../utils/auth"
import { validateBody } from "../../utils/validate"
import { CreateUser, UpdateUser } from "./schema"
import { createUser, deleteUser, getUserById, updateUser } from "./service"

export const router = Router()

router.post("/", async (req, res, next) => {
    try {
        const userData = await validateBody(req, CreateUser)
        const user = await createUser({ ...userData, isAdmin: !!userData.isAdmin })

        res.send(user)
    } catch (err) {
        next(err)
    }
})

router.get("/", async (req, res, next) => {
    try {
        const users = await User.find()

        res.send(users)
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
        const updatedUser = await updateUser(user.id, { name: userData.name, stocks: userData.stocks })

        res.send(updatedUser)
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const token = getTokenFromHeaders(req)
        const admin = await getUserById(token)

        if (admin!.id === req.params.id) {
            return res.status(400).send({ message: "Cannot remove self" })
        }

        const user = await getUserById(req.params.id)
        if (!user) throw new NotFoundError("User not found")

        const deletedUser = await deleteUser(user.id)

        res.send(deletedUser)
    } catch (err) {
        next(err)
    }
})