import { Logo } from "@/components/icons/Logo"
import { clientConfig } from "@/config/client-env"
import { Bars3Icon, ChartPieIcon, MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/solid"
import Link from 'next/link'

type NavProps = {
    toggleSidebar: () => void
}

export function Nav({ toggleSidebar }: NavProps) {
    return (
        <div className="flex justify-between items-center h-14 px-4 md:px-8 border-b dark:bg-zinc-900 dark:border-zinc-800">
            <nav className="flex items-center space-x-10">
                <Link href="/">
                    <a className="flex items-center space-x-1.5">
                        <Logo className="w-6 h-6" />
                        <span className="font-semibold text-lg sm:text-xl underlines underline-offset-2">{clientConfig.app.NAME}</span>
                    </a>
                </Link>
                <ul className="hidden lg:flex space-x-8 text-sm font-semibold">
                    <li><a href="">Cryptocurrencies</a></li>
                    <li><a href="">Exchanges</a></li>
                    <li><a href="">Community</a></li>
                    <li><a href="">Product</a></li>
                    <li><a href="">Learn</a></li>
                </ul>
            </nav>
            <div className="hidden xl:flex items-center space-x-4">
                <p className="flex items-center space-x-1 font-light text-sm">
                    <StarIcon className="w-4 h-4 text-gray-400" />
                    <span>Watchlist</span>
                </p>
                <p className="flex items-center space-x-1 font-light text-sm">
                    <ChartPieIcon className="w-4 h-4 text-gray-400" />
                    <span>Portfolio</span>
                </p>
                <div className="relative">
                    <MagnifyingGlassIcon className="absolute w-4 h-4 left-2 y-1/2 translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search" className="bg-gray-100 dark:bg-zinc-800 rounded-md pl-8 px-3 py-2 text-xs font-medium" />
                </div>
            </div>
            <div className="lg:hidden">
                <Bars3Icon onClick={toggleSidebar} className='w-10 h-10 p-1.5 rounded-full' />
            </div>
        </div>
    )
}
