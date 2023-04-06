export type IStock = {
    name: string,
    profit: number,
    symbol: string,
    overview: string,
    deposits: IDeposit[]
}

export type IDeposit = {
    id: string,
    amount: number,
    date: Date,
}

export type IUser = {
    email: string,
    id: string,
    name: string,
    balance: number,
    stocks: IStock[],
    isAdmin: boolean,
}