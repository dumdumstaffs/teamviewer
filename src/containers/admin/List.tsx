import { useUsers } from "@/hooks/use-users"
import Link from "next/link"

export function List() {
    const users = useUsers()

    return (
        <div className="flex flex-col space-y-4 w-full max-w-2xl p-3 pb-8 mx-auto">
            {users.isSuccess && users.data.map((user) => (
                <div key={user.id} className="flex justify-between items-center rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 hover:dark:bg-zinc-700 py-4 px-8">
                    <p className="text-sm font-medium">{user.id} - {user.name}</p>
                    <Link href={{ pathname: "/settings", query: { view: "update", id: user.id } }}>
                        <a className="rounded-md py-1.5 px-4 bg-blue-600 text-xs text-white font-medium">
                            Update
                        </a>
                    </Link>
                </div>
            ))}
        </div>
    )
}
