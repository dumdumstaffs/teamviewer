import { Diamond } from '@/components/icons/Diamond'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { useAccount, useLogout } from '@/hooks/use-account'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export function Banner() {
    const router = useRouter()

    const account = useAccount()
    const logoutMutation = useLogout()

    const logout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess() {
                router.push("/")
            }
        })
    }

    return (
        <div className="flex justify-between items-center h-10 px-4 md:px-8 border-b dark:bg-zinc-900 dark:border-zinc-800">
            <div className="flex space-x-4 text-xxs text-gray-700 dark:text-zinc-200 overflow-x-scroll no-scrollbar">
                <p className="shrink-0">Cryptos: <span className="text-blue-600 dark:text-blue-500">0.093308</span></p>
                <p className="shrink-0">Market: <span className="text-blue-600 dark:text-blue-500">0.622142</span></p>
                <p className="shrink-0">Prices: <span className="text-blue-600 dark:text-blue-500">0.145487</span></p>
                <p className="shrink-0">Showcase: <span className="text-blue-600 dark:text-blue-500">0.059282</span></p>
                <p className="shrink-0">Tickers: <span className="text-blue-600 dark:text-blue-500">0.185203</span></p>
                <p className="shrink-0">Gas Fees: <span className="text-blue-600 dark:text-blue-500">0.530292</span></p>
                <p className="shrink-0">Dominance: <span className="text-blue-600 dark:text-blue-500">0.132352</span></p>
            </div>
            <div className="shrink-0 hidden lg:flex items-center space-x-4 pl-2">
                <p className="font-medium text-xs hover:bg-gray-100 dark:hover:bg-zinc-800 p-1 rounded-md">English</p>
                <p className="font-medium text-xs flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-zinc-800 p-1 rounded-md">
                    <Image src="https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/USD.svg" alt="usd" width={12} height={12} />
                    <span>USD</span>
                </p>
                <ThemeSwitcher />
                <div className="border-l h-5" />
                <Diamond className="w-5 h-5" />
                {account.isSuccess ? (
                    <div className="flex items-center space-x-4">
                        <button onClick={logout} className="px-3 py-1.5 rounded-lg border border-blue-600 bg-blue-600 text-white text-xs font-medium">Logout</button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link href={{ pathname: "/", query: { view: "login" } }}>
                            <a className="px-3 py-1.5 rounded-lg border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 text-xs font-medium">Log in</a>
                        </Link>
                        <Link href={{ pathname: "/", query: { view: "register" } }}>
                            <a className="px-3 py-1.5 rounded-lg border border-blue-600 bg-blue-600 text-white text-xs font-medium">Sign up</a>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
