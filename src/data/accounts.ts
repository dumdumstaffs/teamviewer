import { apple, bluerock, dowjones, microsoft, Stock, tesla } from "./stocks"

export type Account = {
    id: string,
    holders: string[],
    count: number,
    stocks: (Stock & { price: number })[]
    balance: () => number,
}

const alfred: Account = {
    id: "U046-AUD",
    count: 4,
    holders: ["Alfred Dean"],
    stocks: [
        { ...apple, price: 3120 },
        { ...tesla, price: 6002 },
        { ...bluerock, price: 276 },
        { ...microsoft, price: 900 },
    ],
    balance() {
        return this.stocks.reduce((acc, curr) => acc + curr.price, 0)
    }
}

const khalif: Account = {
    id: "BP12-AUD",
    count: 4,
    holders: ["Khalif Crocker", "Queen Sophia"],
    stocks: [
        { ...apple, price: 3120 },
        { ...tesla, price: 6002 },
        { ...bluerock, price: 276 },
        { ...dowjones, price: 900 },
    ],
    balance() {
        return this.stocks.reduce((acc, curr) => acc + curr.price, 0)
    }
}

export const accounts: Account[] = [
    alfred,
    khalif
]