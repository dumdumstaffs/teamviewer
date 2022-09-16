import mongoose, { Model, Schema } from "mongoose"
import { IStock, IUser } from "../types/user"

export interface UserDocument extends Omit<IUser, "balance"> {
    password: string,
    isAdmin: boolean,
}
export interface UserModel extends Model<UserDocument> { }

const stocksSchema = new Schema<IStock>({
    name: String,
    profit: Number,
}, {
    _id: false,
})

const UserSchema = new Schema<UserDocument>({
    email: String,
    id: String,
    name: String,
    password: String,
    isAdmin: Boolean,
    stocks: [stocksSchema],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform(_doc, ret) {
            delete ret._id
            delete ret.password
            delete ret.isAdmin
            return ret
        }
    }
})

UserSchema.virtual("balance").get(function () {
    return this.stocks.reduce((total, stock) => total + stock.profit, 0)
})

export const User: UserModel = mongoose.models.User || mongoose.model("User", UserSchema)
