export type IStock = {
    name: string,
    profit: number,
    symbol: string,
    overview: string,
}

export type IUser = {
    email: string,
    id: string,
    name: string,
    balance: number,
    stocks: IStock[],
    isAdmin: boolean,
}