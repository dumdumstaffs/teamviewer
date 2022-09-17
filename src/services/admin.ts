import { axios } from "@/api/axios";
import { Account } from "@/data/accounts";

export const getUsers = async () => {
    try {
        const { data } = await axios.get<Account[]>("/users")
        return data
    } catch (err) {
        throw new Error()
    }
}
export const getUser = async (id: string) => {
    try {
        const { data } = await axios.get<Account>(`/users/${id}`)
        return data
    } catch (err) {
        throw new Error()
    }
}

export const createUser = async (user: Partial<Account>) => {
    try {
        const { data } = await axios.post<Account>("/users", user)
        return data
    } catch (err) {
        throw new Error()
    }
}

export const updateUser = async ({ id, user }: { id: string, user: Partial<Account> }) => {
    try {
        const { data } = await axios.put<Account>(`/users/${id}`, user)
        return data
    } catch (err) {
        throw new Error()
    }
}

export const removeUser = async (id: string) => {
    try {
        await axios.delete<Account[]>(`/users/${id}`)
    } catch (err) {
        throw new Error()
    }
}
