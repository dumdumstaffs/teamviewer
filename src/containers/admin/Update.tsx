import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Account } from "@/data/accounts"
import { useRemoveUser, useUpdateUser, useUser } from "@/hooks/use-users"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { z } from "zod"

export function Update() {
    const router = useRouter()
    const { id } = router.query

    if (!id || typeof id !== "string") return null

    const user = useUser(id)
    const removeUserMutation = useRemoveUser()
    const updateUserMutation = useUpdateUser()

    const remove = () => {
        removeUserMutation.mutate(id, {
            onSuccess() {
                router.push({ pathname: "/settings", query: { view: "list" } })
            }
        })
    }

    const removeStock = (symbol: string) => {
        if (!user.data) return

        updateUserMutation.mutate({
            id,
            user: { ...user.data, stocks: user.data.stocks.filter(s => s.symbol !== symbol) }
        })
    }

    return (
        <div className="">
            <div className="flex flex-col w-full max-w-2xl p-3 pb-8 mx-auto">
                {user.isSuccess ? (
                    <>
                        <div className="flex flex-col space-y-4">
                            {user.data.stocks.map((stock) => (
                                <div key={stock.symbol} className="flex justify-between items-center rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 hover:dark:bg-zinc-700 py-4 px-8">
                                    <p className="text-sm font-medium">{stock.symbol} - {stock.name} ${stock.profit}</p>
                                    <button onClick={() => removeStock(stock.symbol)} className="rounded-md py-1.5 px-4 bg-red-600 text-xs text-white font-medium">
                                        Remove
                                    </button>
                                </div>
                            ))}
                            {!user.data.stocks.length && (
                                <div className="flex items-center justify-center text-sm">No stocks</div>
                            )}
                        </div>

                        <div className="rounded-xl space-y-4 px-4 pt-5 pb-8 mt-12 mb-12 bg-gray-50  dark:bg-zinc-800">
                            <p className="text-center">{user.data.id} - {user.data.name}</p>
                            <p className="text-center">{user.data.email}</p>
                            <p className="text-center text-lg">${user.data.balance}</p>
                            {user.data.isAdmin && (
                                <p className="text-center text-xs text-green-400">Admin</p>
                            )}
                        </div>

                        <AddStock user={user.data} />

                        <button onClick={remove} className="w-full mt-20 rounded-md py-3 px-4 bg-red-600 text-xs text-white font-medium">
                            Remove User
                        </button>
                        {removeUserMutation.isError && (
                            <p className="text-center text-sm">Unable to remove this account</p>
                        )}
                    </>
                ) : (
                    <div className="flex items-center justify-center text-sm">User not found</div>
                )}
            </div>
        </div>
    )
}

export const addStockSchema = z.object({
    name: z.string(),
    profit: z.number(),
    symbol: z.string(),
    overview: z.string(),
})

const AddStock = ({ user }: { user: Account }) => {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof addStockSchema>>({
        resolver: zodResolver(addStockSchema)
    })

    const updateUserMutation = useUpdateUser()

    const addStock = handleSubmit(async (stockData) => {
        updateUserMutation.mutate({
            id: user.id,
            user: { ...user, stocks: [...user.stocks, stockData] }
        }, {
            onSuccess() {
                router.push({ pathname: "/settings", query: { view: "update", id: user.id } })
            }
        })
    })

    return (
        <form onSubmit={addStock} className="mx-auto border border-gray-200 dark:border-zinc-800 rounded-md w-full max-w-xl p-4 pb-8">
            <div className="flex flex-col items-center space-y-3 p-2">
                <h3 className="text-2xl font-medium">Add Stock</h3>
            </div>

            <div className="py-2">
                <Input
                    label="Name"
                    placeholder="Name"
                    className="bg-gray-100 dark:bg-zinc-800 rounded-md mt-1 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("name")}
                    error={errors.name?.message}
                />
            </div>
            <div className="py-2">
                <Input
                    label="Profit"
                    placeholder="Profit"
                    type="number"
                    className="bg-gray-100 dark:bg-zinc-800 rounded-md mt-1 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("profit", { valueAsNumber: true })}
                    error={errors.profit?.message}
                />
            </div>
            <div className="py-2">
                <Input
                    label="Symbol"
                    placeholder="Symbol"
                    className="bg-gray-100 dark:bg-zinc-800 rounded-md mt-1 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("symbol")}
                    error={errors.symbol?.message}
                />
            </div>
            <div className="py-2">
                <Input
                    label="Overview"
                    placeholder="Overview"
                    className="bg-gray-100 dark:bg-zinc-800 rounded-md mt-1 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("overview")}
                    error={errors.overview?.message}
                />
            </div>

            <Button loading={isSubmitting || updateUserMutation.isLoading} className="w-full py-2 mt-4 rounded-md border border-blue-600 bg-blue-600 text-sm text-white font-medium">
                Add Stock
            </Button>
        </form>
    )
}