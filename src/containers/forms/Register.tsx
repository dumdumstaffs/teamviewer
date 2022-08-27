import { ErrorBanner } from '@/components/forms/ErrorBanner'
import { Logo } from '@/components/icons/Logo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import * as accounts from '@/services/accounts'
import { zodResolver } from "@hookform/resolvers/zod"
import Link from 'next/link'
import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerSchema = z.object({
    accountId: z.string().min(1, { message: "Account ID is required" })
})

type RegisterSchema = z.infer<typeof registerSchema>

type FormError = "invalid_credentials" | "duplicate_credentials" | "operation_failed" | null

export function Register() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema)
    })

    const id = useId()
    const [error, setError] = useState<FormError>(null)

    const handleRegister = handleSubmit(async ({ accountId }) => {
        try {
            const account = await accounts.register(accountId)
            if (account) return setError("duplicate_credentials")

            setError("invalid_credentials")
        } catch (err) {
            setError("operation_failed")
        }
    })

    return (
        <form onSubmit={handleRegister} className="border border-gray-200 dark:border-zinc-800 rounded-md w-full max-w-lg p-4">
            <div className="flex flex-col items-center space-y-3 p-2">
                <Logo className="w-12 h-12" />
                <h3 className="text-2xl font-medium">Register</h3>
            </div>

            {error === "duplicate_credentials" && (
                <ErrorBanner title="Account already exists!" info="You are trying to link an Account that already exists, please try again with different credentials." />
            )}
            {error === "invalid_credentials" && (
                <ErrorBanner title="Authentication failed!" info="Incorrect Account ID, please try again with the correct credentials." />
            )}
            {error === "operation_failed" && (
                <ErrorBanner title="Something went wrong!" info="Please try again." />
            )}

            <div className="py-4">
                <Input
                    id={id}
                    label="Link Account ID"
                    info="Link your trading Account ID"
                    placeholder="Trading Account ID"
                    className="bg-gray-100 dark:bg-zinc-800 rounded-md px-3 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("accountId")}
                    error={errors.accountId?.message}
                />
            </div>

            <Button loading={isSubmitting} className="w-full block py-3 mt-4 rounded-md border border-blue-600 bg-blue-600 text-sm text-white font-medium">Register</Button>

            <div className="flex flex-col items-center py-4">
                <Link href={{ pathname: "/", query: { view: "login" } }}>
                    <a className="text-xs text-gray-600 dark:text-zinc-300">Already have an account? Log in</a>
                </Link>
            </div>
        </form>
    )
}