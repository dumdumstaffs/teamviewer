import { ErrorBanner } from '@/components/forms/ErrorBanner'
import { Logo } from '@/components/icons/Logo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useLogin } from '@/hooks/use-account'
import { zodResolver } from "@hookform/resolvers/zod"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
    accountId: z.string().min(1, { message: "Account ID is required" })
})

type LoginSchema = z.infer<typeof loginSchema>

type LoginError = "invalid_credentials" | "operation_failed" | null

export function Login() {
    const id = useId()
    const router = useRouter()
    const [error, setError] = useState<LoginError>(null)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    })

    const loginMutation = useLogin()

    const handleLogin = handleSubmit(async ({ accountId }) => {
        loginMutation.mutate(accountId, {
            onSuccess() {
                router.push("/account")
            },
            onError() {
                setError("invalid_credentials")
            }
        })
    })

    return (
        <form onSubmit={handleLogin} className="border border-gray-200 dark:border-zinc-800 rounded-md w-full max-w-lg p-4">
            <div className="flex flex-col items-center space-y-3 p-2">
                <Logo className="w-12 h-12" />
                <h3 className="text-2xl font-medium">Log In</h3>
            </div>

            {error === "invalid_credentials" && (
                <ErrorBanner title="Authentication failed!" info="Incorrect Account ID, please try again with the correct credentials." />
            )}
            {error === "operation_failed" && (
                <ErrorBanner title="Something went wrong!" info="Please try again." />
            )}

            <div className="py-4">
                <Input
                    id={id}
                    label="Account ID"
                    info="Your unique Account ID"
                    placeholder="Account ID"
                    className="bg-gray-100 dark:bg-zinc-800 rounded-md px-3 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("accountId")}
                    error={errors.accountId?.message}
                />
            </div>

            <Button loading={isSubmitting || loginMutation.isLoading} className="w-full py-3 mt-4 rounded-md border border-blue-600 bg-blue-600 text-sm text-white font-medium">Log In</Button>

            <div className="flex flex-col items-center py-4">
                <Link href={{ pathname: "/", query: { view: "register" } }}>
                    <a className="text-xs text-gray-600 dark:text-zinc-300">{"Don't have an account? Register"}</a>
                </Link>
            </div>
        </form>
    )
}