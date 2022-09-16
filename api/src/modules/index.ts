import * as middlewares from "../middlewares"
import { router as account } from "./account"
import { router as users } from "./users"

import { Router } from "express"

export const router = Router()

router.use("/account", middlewares.auth, account)
router.use("/users", middlewares.admin, users)
