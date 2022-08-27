import { Diamond } from '@/components/icons/Diamond'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { useAccount } from '@/hooks/use-account'
import { ChartPieIcon, ChevronDownIcon, StarIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLockBodyScroll } from 'react-use'

type SidebarProps = {
    open: boolean,
    toggleSidebar: () => void
}

export function Sidebar({ open, toggleSidebar }: SidebarProps) {
    const router = useRouter()
    const { account, signOut } = useAccount()

    useLockBodyScroll(open)

    const logout = () => {
        signOut()
        router.push("/")
    }

    return (
        <motion.div
            className="lg:hidden fixed top-24 inset-0 z-10 bg-white dark:bg-zinc-900 h-[calc(100vh-96px)] w-full flex flex-col justify-between"
            initial={{
                x: "-100%"
            }}
            animate={{
                x: open ? 0 : "-100%",
                transition: {
                    type: "tween"
                }
            }}
        >
            <div className="px-4 pb-12 overflow-y-scroll no-scrollbar">
                <ul className="flex flex-col text-sm font-semibold">
                    <li className="border-b dark:border-zinc-800 py-3">
                        <a className="flex items-center justify-between" href="">
                            <span>Cryptocurrencies</span>
                            <ChevronDownIcon className="w-4 h-4" />
                        </a>
                    </li>
                    <li className="border-b dark:border-zinc-800 py-3">
                        <a className="flex items-center justify-between" href="">
                            <span>Exchanges</span>
                            <ChevronDownIcon className="w-4 h-4" />
                        </a>
                    </li>
                    <li className="border-b dark:border-zinc-800 py-3">
                        <a className="flex items-center justify-between" href="">
                            <span>Community</span>
                            <ChevronDownIcon className="w-4 h-4" />
                        </a>
                    </li>
                    <li className="border-b dark:border-zinc-800 py-3">
                        <a className="flex items-center justify-between" href="">
                            <span>Product</span>
                            <ChevronDownIcon className="w-4 h-4" />
                        </a>
                    </li>
                    <li className="border-b dark:border-zinc-800 py-3">
                        <a className="flex items-center justify-between" href="">
                            <span>Learn</span>
                            <ChevronDownIcon className="w-4 h-4" />
                        </a>
                    </li>
                </ul>

                <div className="flex-flex-col">
                    <p className="flex items-center space-x-2 py-3 border-b dark:border-zinc-800 font-medium">
                        <StarIcon className="w-6 h-6 text-gray-400" />
                        <span>Watchlist</span>
                    </p>
                    <p className="flex items-center space-x-2 py-3 border-b dark:border-zinc-800 font-medium">
                        <ChartPieIcon className="w-6 h-6 text-gray-400" />
                        <span>Portfolio</span>
                    </p>
                    <p className="flex items-center space-x-2 py-3 border-b dark:border-zinc-800 font-medium">
                        <Diamond className="w-6 h-6 text-gray-400" />
                        <span>My Diamonds</span>
                    </p>
                </div>

                <div onClick={toggleSidebar} className="flex flex-col space-y-2 mt-10">
                    {account ? (
                        <button onClick={logout} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-200 dark:bg-zinc-800 text-sm font-semibold text-center">Logout</button>
                    ) : (
                        <>
                            <Link href={{ pathname: "/", query: { view: "register" } }}>
                                <a className="w-full px-4 py-3 rounded-lg border border-blue-600 bg-blue-600 text-white text-sm font-semibold text-center">Sign up</a>
                            </Link>
                            <Link href={{ pathname: "/", query: { view: "login" } }}>
                                <a className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-200 dark:bg-zinc-800 text-sm font-semibold text-center">Log in</a>
                            </Link>
                        </>
                    )}
                </div>

                <div className="flex items-center space-x-2 mt-10">
                    <button className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-zinc-800 text-sm font-semibold text-center">
                        English
                    </button>
                    <button className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-zinc-800 flex items-center justify-center space-x-2 text-sm font-semibold">
                        <img src="https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/USD.svg" alt="usd" width={12} height={12} />
                        <span>USD</span>
                    </button>
                    <div className="shrink-0 px-4 py-2 rounded-lg bg-gray-200 dark:bg-zinc-800 flex items-center justify-center">
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
