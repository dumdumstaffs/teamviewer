import { useAccount } from "@/hooks/use-account";
import { Layout } from "@/layouts/Layout";
import Image from "next/image";
import Link from "next/link";
import { MiniChart, SymbolOverview } from "react-ts-tradingview-widgets";

export default function Account() {
    const account = useAccount()

    return (
        <Layout mode="auth">
            {!account.isSuccess ? null : (
                <div className="px-4 md:px-10 xl:px-20 py-12 dark:bg-neutral-900">
                    <h3 className="text-2xl mb-6">Account: #{account.data.id.toUpperCase()}</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {account.data.stocks.map((stock) => (
                            <div key={stock.symbol} className="border dark:border-zinc-700 rounded-md overflow-hidden">
                                <MiniChart symbol={stock.symbol} autosize isTransparent />
                            </div>
                        ))}
                    </div>

                    <div className="mt-12">
                        {/* acct details */}
                        <p className="text-xs text-gray-600 dark:text-zinc-200">Total Balance:</p>
                        <p className="text-3xl mb-1">{account.data.balance.toLocaleString()} USD</p>
                        <p className="mb-3 flex items-center space-x-6">
                            <span className="text-sm whitespace-nowrap">Account Holder(s):</span>
                            <span className="text-sm font-medium">{account.data.name}</span>
                        </p>

                        {/* assets */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 py-4">
                            {account.data.stocks.map((stock) => (
                                <AssetCard key={stock.symbol} name={stock.name} icon={stock.icon} price={stock.profit} />
                            ))}
                        </div>

                        {/* comments */}
                        <p className="text-sm mt-4 text-gray-600 dark:text-zinc-200">You have a total of {account.data.balance.toLocaleString()} from {account.data.stocks.length} accounts.</p>
                    </div>

                    <div className="w-full h-96 rounded-md overflow-hidden mt-12">
                        <SymbolOverview autosize isTransparent symbols={account.data.stocks.map((stock) => [stock.name, stock.overview])} />
                    </div>

                    <div className="py-4">
                        <Link href="/settings">
                            <a className="block text-center w-full py-3 mt-4 rounded-md border border-blue-600 bg-blue-600 text-sm text-white font-medium">Settings</a>
                        </Link>
                    </div>
                </div>
            )}
        </Layout>
    )
}

type AssetCardProps = {
    name: string,
    icon: string,
    price: number,
}

const AssetCard = ({ name, icon, price }: AssetCardProps) => (
    <div className="flex flex-col items-center justify-between px-2 py-5 rounded-xl bg-gray-50 dark:bg-zinc-800 transition-all sm:hover:scale-105 cursor-pointer">
        <div className="mb-3">
            <Image src={icon} width={56} height={56} alt={name} className="rounded-full" />
        </div>
        <div className="flex flex-col items-center text-sm">
            <p>{name}</p>
            <p className="text-lg font-medium">${price.toLocaleString()}</p>
        </div>
    </div>
)
