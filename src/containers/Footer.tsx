import { Logo } from "@/components/icons/Logo";
import { clientConfig } from "@/config/client-env";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-8 py-12 px-4 md:px-8 border-t dark:border-zinc-700">
            <div className="col-span-2 sm:col-span-3 md:col-span-2">
                <Link href="/">
                    <a className="flex items-center space-x-1.5">
                        <Logo className="w-6 h-6" />
                        <span className="font-semibold text-lg sm:text-xl underlines underline-offset-2">{clientConfig.app.NAME}</span>
                    </a>
                </Link>
            </div>
            <div className="">
                <h3 className="text-sm sm:text-base font-medium">Products</h3>
                <ul className="flex flex-col mt-6 space-y-4 text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
                    <li><a href="">Blockchain Explorer</a></li>
                    <li><a href="">Crypto API</a></li>
                    <li><a href="">Crypto Indices</a></li>
                    <li><a href="">Jobs Board</a></li>
                    <li><a href="">Sitemap</a></li>
                </ul>
            </div>
            <div className="">
                <h3 className="text-sm sm:text-base font-medium">Products</h3>
                <ul className="flex flex-col mt-6 space-y-4 text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
                    <li><a href="">Blockchain Explorer</a></li>
                    <li><a href="">Crypto API</a></li>
                    <li><a href="">Crypto Indices</a></li>
                    <li><a href="">Jobs Board</a></li>
                    <li><a href="">Sitemap</a></li>
                </ul>
            </div>
            <div className="">
                <h3 className="text-sm sm:text-base font-medium">Tokenomics</h3>
                <ul className="flex flex-col mt-6 space-y-4 text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
                    <li><a href="">Disclaimer</a></li>
                    <li><a href="">Methodology</a></li>
                    <li><a href="">Terms of use</a></li>
                    <li><a href="">Request Form</a></li>
                    <li><a href="">FAQ</a></li>
                </ul>
            </div>
        </footer>
    )
}