import { Stock } from "./stocks";

export type Account = {
    email: string,
    id: string,
    name: string,
    balance: number,
    isAdmin: boolean,
    stocks: Stock[],
    btcAddress?: string,
}
