import mongoose, { Model, Schema } from "mongoose"
import { IDeposit, IStock, IUser } from "../types/user"

export interface UserDocument extends Omit<IUser, "balance"> {
    password: string,
}
export interface UserModel extends Model<UserDocument> { }

const depositSchema = new Schema<IDeposit>({
    amount: Number,
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform(_doc, ret) {
            delete ret._id
            return ret
        }
    }
})

const stocksSchema = new Schema<IStock>({
    name: String,
    profit: Number,
    symbol: String,
    overview: String,
    deposits: [depositSchema]
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
    btcAddress: String,
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
    return this.stocks.reduce((total, stock) => {
        const deposits = stock.deposits.reduce((total, deposit) => total + deposit.amount, 0)
        return total + stock.profit + deposits
    }, 0)
})

export const User: UserModel = mongoose.models.User || mongoose.model("User", UserSchema)
