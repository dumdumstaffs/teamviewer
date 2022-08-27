import { Account } from "@/data/accounts"
import * as accounts from "@/services/accounts"
import { useCallback } from "react"
import { useLocalStorage } from "./use-local-storage"

export const useAccount = () => {
    const [id, setId, clearStorage, isReady] = useLocalStorage<string>("account")

    const account = accounts.get(id || "")

    const signIn = useCallback((acc: Account) => setId(acc.id), [setId])
    const signOut = useCallback(() => clearStorage(), [clearStorage])

    return { account, signIn, signOut, isReady }
}
