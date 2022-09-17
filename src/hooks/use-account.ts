import * as accounts from "@/services/accounts"
import { useMutation, useQuery, useQueryClient } from "react-query"

const queryKey = ["account"]

export const useAccount = () => useQuery(queryKey, accounts.getUser, {
    retry: false
})

export const useLogin = () => {
    const queryClient = useQueryClient()

    return useMutation(accounts.login, {
        onMutate(id) {
            localStorage.setItem("token", id)
        },
        onSuccess() {
            queryClient.invalidateQueries(queryKey)
        },
        onError() {
            localStorage.removeItem("token")
        }
    })
}

export const useRegister = () => useMutation(accounts.register)

export const useLogout = () => {
    const queryClient = useQueryClient()

    return useMutation(async () => { }, {
        async onMutate(id) {
            localStorage.removeItem("token")
            return queryClient.cancelQueries(queryKey)
        },
        async onSuccess() {
            await queryClient.invalidateQueries(queryKey)
        }
    })
}
