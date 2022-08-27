import { useCallback, useEffect, useState } from "react"

type LocalStorageReturn<T> = [T, (value: T) => void, () => void, boolean]

// function overloads
export function useLocalStorage<T>(key: string, initialValue: T): LocalStorageReturn<T>
export function useLocalStorage<T = undefined>(key: string): LocalStorageReturn<T | undefined>

export function useLocalStorage<T>(key: string, initialValue?: T): LocalStorageReturn<T | undefined> {
    const [isReady, setIsReady] = useState(false)
    const [storedValue, setStoredValue] = useState<T | undefined>(initialValue)

    useEffect(() => {
        try {
            const item = localStorage.getItem(key)

            // set stored value if key is set in local storage
            if (item) setStoredValue(JSON.parse(item))
            setIsReady(true)
        } catch (error) {
            localStorage.removeItem(key)
        }
    }, [key])

    const setValue = useCallback((value: T | undefined) => {
        // Save state
        setStoredValue(value)
        // Save to local storage
        if (typeof window !== "undefined") {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key])

    const clearValue = useCallback(() => {
        // Reset state
        setStoredValue(undefined)
        // Remove from local storage
        if (typeof window !== "undefined") {
            localStorage.removeItem(key);
        }
    }, [key])

    return [storedValue, setValue, clearValue, isReady]
}
