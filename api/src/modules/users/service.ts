import { config } from "../../config"
import { User } from "../../models/user"
import { IStock, IUser } from "../../types/user"
import { generateId } from "../../utils/id"

export async function getUserByEmail(email: string) {
    const user = await User.findOne({ email })

    if (user) return user

    if (email === config.ADMIN_EMAIL) {
        const admin = await createUser({
            email: config.ADMIN_EMAIL,
            name: "Administrator",
            isAdmin: true,
            password: config.ADMIN_PASS
        })
        console.log("created admin")
        return admin
    }

    return null
}

export async function getUserById(id: string) {
    return await User.findOne({ id })
}

export type CreateUser = Omit<IUser, "id" | "balance" | "stocks"> & {
    stocks?: IStock[],
    isAdmin?: boolean,
    password: string
}

export async function createUser(data: CreateUser) {
    return User.create({ ...data, id: generateId() })
}

export type UpdateUser = Omit<IUser, "id" | "email" | "balance" | "stocks"> & {
    stocks?: IStock[],
}

export async function updateUser(id: string, data: UpdateUser) {
    return User.findOneAndUpdate({ id }, data, { new: true })
}