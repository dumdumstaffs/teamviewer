import { Account, accounts } from "@/data/accounts";
import { promise } from "./promise";

export const get = (id: string): Account | null => {
    const account = accounts.find(acc => acc.id.toLowerCase() === id.toLowerCase())

    if (!account) return null

    return account
}

export const login = async (id: string): Promise<Account | null> => {
    const account = accounts.find(acc => acc.id.toLowerCase() === id.toLowerCase())

    // simulate 3s delay
    await promise(3000)

    if (!account) return null

    return account
}

export const register = async (id: string): Promise<Account | null> => {
    const account = accounts.find(acc => acc.id.toLowerCase() === id.toLowerCase())

    // simulate 5s delay
    await promise(5000)

    if (!account) return null

    return account
}
