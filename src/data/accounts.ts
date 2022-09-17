import { Stock } from "./stocks";

export type Account = {
    email: string,
    id: string,
    name: string,
    balance: number,
    stocks: Stock[],
    isAdmin: boolean,
}
