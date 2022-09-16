export type IStock = {
    name: string,
    profit: number,
}

export type IUser = {
    email: string,
    id: string,
    name: string,
    balance: number,
    stocks: IStock[],
}