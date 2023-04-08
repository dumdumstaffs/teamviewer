import { findStock } from "@/data/stocks";
import { useAccount } from "@/hooks/use-account";
import { Layout } from "@/layouts/Layout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MiniChart, SymbolOverview } from "react-ts-tradingview-widgets";

const stockIcon = (name: string) => findStock(name)?.icon || "/icons/usa.svg";

export default function Account() {
  const account = useAccount();

  const [stock, setStock] = useState(account.data?.stocks[0]?.name ?? "");

  const deposits =
    account.data?.stocks
      .find((s) => s.name === stock)
      ?.deposits.sort(
        (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
      ) ?? [];

  return (
    <Layout mode="auth">
      {!account.isSuccess ? null : (
        <div className="px-4 md:px-10 xl:px-20 py-12 dark:bg-neutral-900">
          <h3 className="text-2xl mb-6">
            Account: #{account.data.id.toUpperCase()}
          </h3>
          {account.data.isAdmin && (
            <Link href="/settings">
              <a className="inline-block text-center py-2 px-4 mt-4 mb-8 rounded-md border border-blue-600 bg-blue-600 text-sm text-white font-medium">
                Settings
              </a>
            </Link>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {account.data.stocks.map((stock) => (
              <div
                key={stock.symbol}
                className="border dark:border-zinc-700 rounded-md overflow-hidden"
              >
                <MiniChart symbol={stock.symbol} autosize isTransparent />
              </div>
            ))}
          </div>

          <div className="mt-12">
            {/* acct details */}
            <p className="text-xs text-gray-600 dark:text-zinc-200">
              Total Balance:
            </p>
            <p className="text-3xl mb-1">
              {account.data.balance.toLocaleString()} USD
            </p>
            <p className="mb-3 flex items-center space-x-6">
              <span className="text-sm whitespace-nowrap">
                Account Holder(s):
              </span>
              <span className="text-sm font-medium">{account.data.name}</span>
            </p>

            {/* assets */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 py-4">
              {account.data.stocks.map((stock) => (
                <AssetCard
                  key={stock.symbol}
                  name={stock.name}
                  icon={stockIcon(stock.name)}
                  balance={
                    stock.profit +
                    stock.deposits.reduce(
                      (total, deposit) => total + deposit.amount,
                      0
                    )
                  }
                />
              ))}
            </div>

            {/* comments */}
            <p className="text-sm mt-4 text-gray-600 dark:text-zinc-200">
              You have a total of {account.data.balance.toLocaleString()} from{" "}
              {account.data.stocks.length} accounts.
            </p>
          </div>

          <div className="mt-12 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium py-2">Transaction history</h4>

              {account.data.stocks.length > 0 && (
                <select
                  className="bg-gray-100 dark:bg-zinc-800 rounded-md mt-1 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                >
                  {account.data.stocks.map((stock) => (
                    <option key={stock.name} value={stock.name}>
                      {stock.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {deposits.length ? (
              <ul className="divide-y dark:divide-zinc-800">
                {deposits.map((deposit) => (
                  <div
                    key={deposit.id}
                    className="flex flex-col gap-y-2 px-4 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs">
                        {new Date(deposit.date).toDateString()}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">${deposit.amount}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-sm">
                <p>No transactions</p>
              </div>
            )}
          </div>

          {account.data.stocks.length > 0 && (
            <div className="w-full h-96 rounded-md overflow-hidden mt-12">
              <SymbolOverview
                autosize
                isTransparent
                symbols={account.data.stocks.map((stock) => [
                  stock.name,
                  stock.overview,
                ])}
              />
            </div>
          )}

          {/* wallet addres */}
          {account.data.btcAddress && (
            <div className="mt-12 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium py-2">Wallet Address</h4>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="text-lg hidden md:block">
                  <p>BTC Wallet</p>
                </div>

                <div className="md:w-1/2 flex flex-col items-center px-2 py-10 rounded-xl bg-gray-50 dark:bg-zinc-800">
                  <div className="mb-5">
                    <Image
                      src="/icons/btc.svg"
                      width={56}
                      height={56}
                      alt="BTC"
                      className="rounded-full"
                    />
                  </div>

                  <p className="text-center break-all">
                    {account.data.btcAddress}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

type AssetCardProps = {
  name: string;
  icon: string;
  balance: number;
};

const AssetCard = ({ name, icon, balance }: AssetCardProps) => (
  <div className="flex flex-col items-center justify-between px-2 py-5 rounded-xl bg-gray-50 dark:bg-zinc-800 transition-all sm:hover:scale-105 cursor-pointer">
    <div className="mb-3">
      <Image
        src={icon}
        width={56}
        height={56}
        alt={name}
        className="rounded-full"
      />
    </div>
    <div className="flex flex-col items-center text-sm">
      <p>{name}</p>
      <p className="text-lg font-medium">${balance.toLocaleString()}</p>
    </div>
  </div>
);
