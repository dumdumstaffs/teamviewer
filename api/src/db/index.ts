import mongoose from "mongoose"
import { config } from "../config"

let connected = false

export async function connectDb() {
    if (connected) return Promise.resolve()

    try {
        await mongoose.connect(config.MONGO_URI)
        connected = true
    } catch (err: any) {
        console.log("Mongoose connection error", err.message)
    }
}
