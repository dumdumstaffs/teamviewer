import * as admin from "@/services/admin"
import { useMutation, useQuery, useQueryClient } from "react-query"

const queryKey = ["users"]

export const useUsers = () => useQuery(queryKey, admin.getUsers)

export const useUser = (id: string) => useQuery(queryKey.concat(id), () => admin.getUser(id))

export const useCreateUser = () => {
    const queryClient = useQueryClient()

    return useMutation(admin.createUser, {
        onSuccess() {
            queryClient.invalidateQueries(queryKey)
        },
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation(admin.updateUser, {
        onSuccess() {
            queryClient.invalidateQueries(queryKey)
        },
    })
}

export const useRemoveUser = () => {
    const queryClient = useQueryClient()

    return useMutation(admin.removeUser, {
        onSuccess() {
            queryClient.invalidateQueries(queryKey)
        },
    })
}
