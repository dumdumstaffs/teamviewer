import mongoose, { Model, Schema } from "mongoose"
import { IStock, IUser } from "../types/user"

export interface UserDocument extends Omit<IUser, "balance"> {
    password: string,
}
export interface UserModel extends Model<UserDocument> { }

const stocksSchema = new Schema<IStock>({
    name: String,
    profit: Number,
    symbol: String,
    overview: String,
}, {
    _id: false,
})

const UserSchema = new Schema<UserDocument>({
    email: {
        type: String,
        unique: true,
    },
    id: {
        type: String,
        unique: true,
    },
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
            return ret
        }
    }
})

UserSchema.virtual("balance").get(function () {
    return this.stocks.reduce((total, stock) => total + stock.profit, 0)
})

export const User: UserModel = mongoose.models.User || mongoose.model("User", UserSchema)
