import { axios } from "@/api/axios";
import { Account } from "@/data/accounts";
import { promise } from "./promise";

export const getUser = async () => {
    try {
        const { data } = await axios.get<Account>("/account")
        return data
    } catch (err) {
        throw new Error()
    }
}

export const login = async (id: string) => {
    try {
        await promise(2000)

        const { data } = await axios.get<Account>("/account")

        return data
    } catch (err) {
        throw new Error()
    }
}

export const register = async (id: string) => {
    try {
        await promise(5000, true)
    } catch (err) {
        throw new Error()
    }

}
