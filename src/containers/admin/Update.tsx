import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Account } from "@/data/accounts";
import { Deposit, findStock, Stock, stocks } from "@/data/stocks";
import { useRemoveUser, useUpdateUser, useUser } from "@/hooks/use-users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const views = ["list-stocks", "add-stock", "deposits", "remove-user"] as const;

export function Update() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [view, setView] = useState<typeof views[number]>("list-stocks");

  const user = useUser(id);

  return (
    <div className="">
      <div className="flex flex-col gap-y-10 w-full max-w-2xl p-3 pb-8 mx-auto">
        {user.isSuccess ? (
          <>
            {/* user info */}
            <div className="rounded-xl space-y-4 px-4 pt-5 pb-8 bg-gray-50 dark:bg-zinc-800">
              <p className="text-center">
                <span className="font-medium">{user.data.id}</span> -{" "}
                {user.data.name}
              </p>
              <p className="text-center">{user.data.email}</p>
              <p className="text-center text-xl">${user.data.balance}</p>
              {user.data.isAdmin && (
                <p className="text-center text-xs text-green-400">Admin</p>
              )}
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-center text-sm font-medium">
              {views.map((v) => (
                <div
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-8 py-6 rounded-xl ${
                    v === view
                      ? "bg-green-500/20"
                      : "bg-gray-50 dark:bg-zinc-800"
                  }  transition-all sm:hover:scale-105 cursor-pointer`}
                >
                  <p>
                    {v
                      .split("-")
                      .map((v) => v[0].toUpperCase() + v.slice(1))
                      .join(" ")}
                  </p>
                </div>
              ))}
            </div>

            {view === "list-stocks" && <ListStock user={user.data} />}
            {view === "add-stock" && (
              <AddStock
                user={user.data}
                onDone={() => setView("list-stocks")}
              />
            )}
            {view === "deposits" && <Deposits user={user.data} />}
            {view === "remove-user" && <RemoveUser user={user.data} />}
          </>
        ) : (
          <div className="flex items-center justify-center text-sm">
            User not found
          </div>
        )}
      </div>
    </div>
  );
}

const ListStock = ({ user }: { user: Account }) => {
  const [stock, setStock] = useState<Stock>();

  const updateUserMutation = useUpdateUser();

  const removeStock = () => {
    if (!stock) return;

    updateUserMutation.mutate(
      {
        id: user.id,
        user: {
          ...user,
          stocks: user.stocks.filter((s) => s.symbol !== stock.symbol),
        },
      },
      {
        onSuccess() {
          setStock(undefined);
        },
      }
    );
  };

  if (stock)
    return (
      <div className="rounded-xl bg-red-50 flex flex-col items-center justify-center gap-2 p-12">
        <div className="mb-2 text-center">
          <p className="font-medium">
            {stock.symbol} - {stock.name}
          </p>
          <p className="text-xs">
            All transactions for this stock will be lost
          </p>
        </div>
        <button
          onClick={removeStock}
          className="bg-red-400 hover:bg-red-500 text-white px-3 py-2 rounded-sm text-xs font-medium"
        >
          Remove Stock
        </button>
        <button
          onClick={() => setStock(undefined)}
          className="text-center text-xs text-red-500 underline"
        >
          Cancel
        </button>
      </div>
    );

  return (
    <div className="flex flex-col space-y-4">
      {user.stocks.map((stock) => (
        <div
          key={stock.symbol}
          className="flex flex-col gap-y-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 hover:dark:bg-zinc-700 py-4 px-8"
        >
          <p className="text-sm font-medium">
            {stock.symbol} - {stock.name}
          </p>
          <div className="text-sm space-y-1">
            <p>
              Open balance:{" "}
              <span className="text-green-600">+{stock.profit}</span>
            </p>
            <p>
              Deposits:{" "}
              <span className="text-green-600">
                +
                {stock.deposits.reduce(
                  (total, deposit) => total + deposit.amount,
                  0
                )}
              </span>
            </p>
            <p>
              Total balance:{" "}
              <span className="font-semibold">
                $
                {stock.profit +
                  stock.deposits.reduce(
                    (total, deposit) => total + deposit.amount,
                    0
                  )}
              </span>
            </p>
          </div>
          <button
            onClick={() => setStock(stock)}
            className="self-end rounded-md py-1.5 px-4 bg-red-400 hover:bg-red-500 text-xs text-white font-medium"
          >
            Remove
          </button>
        </div>
      ))}

      {!user.stocks.length && (
        <div className="flex items-center justify-center text-sm">
          No stocks
        </div>
      )}
    </div>
  );
};

const addStockSchema = z.object({
  stock: z.string(),
  profit: z.number({ invalid_type_error: "Invalid amount" }),
});

function AddStock({ user, onDone }: { user: Account; onDone: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof addStockSchema>>({
    resolver: zodResolver(addStockSchema),
  });
  const [error, setError] = useState<string>();

  const updateUserMutation = useUpdateUser();

  const addStock = handleSubmit(async ({ stock, profit }) => {
    const stockTemplate = findStock(stock);
    if (!stockTemplate) return setError("Stock not found!");
    const { name, overview, symbol } = stockTemplate;

    const exists = user.stocks.find((s) => s.name === stockTemplate.name);
    if (exists) {
      return setError("Stock already exixts");
    }

    setError(undefined);

    updateUserMutation.mutate(
      {
        id: user.id,
        user: {
          ...user,
          stocks: [
            ...user.stocks,
            { profit, name, overview, symbol, deposits: [] },
          ],
        },
      },
      {
        onSuccess() {
          reset();
          onDone();
        },
      }
    );
  });

  return (
    <form
      onSubmit={addStock}
      className="mx-auto border border-gray-200 dark:border-zinc-800 rounded-md w-full max-w-xl p-4 pb-8"
    >
      <div className="flex flex-col items-center space-y-3 p-2">
        <h3 className="text-2xl font-medium">Add Stock</h3>
      </div>

      <div className="py-2">
        <label className="text-sm font-medium mb-1">Stock</label>
        <select
          placeholder="Stock"
          className="w-full bg-gray-100 dark:bg-zinc-800 rounded-md mt-1 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("stock")}
        >
          {stocks.map((stock) => (
            <option key={stock.name} value={stock.name}>
              {stock.name}
            </option>
          ))}
        </select>
      </div>
      <div className="py-2">
        <Input
          label="Profit"
          placeholder="Opening balance"
          type="number"
          className="bg-gray-100 dark:bg-zinc-800 rounded-md mt-1 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("profit", { valueAsNumber: true })}
          error={errors.profit?.message}
        />
      </div>

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

      <Button
        loading={isSubmitting || updateUserMutation.isLoading}
        className="w-full py-4 mt-4 rounded-sm border border-blue-600 bg-blue-600 text-sm text-white font-medium"
      >
        Add Stock
      </Button>
    </form>
  );
}

const addDepositSchema = z.object({
  amount: z.number({ invalid_type_error: "Invalid amount" }),
  date: z
    .date({ invalid_type_error: "Invalid date" })
    .refine((val) => val < new Date(), {
      message: "Date cannot be in the future",
    }),
});

function Deposits({ user }: { user: Account }) {
  const [stock, setStock] = useState(user.stocks[0]?.name ?? "");

  const deposits =
    user.stocks
      .find((s) => s.name === stock)
      ?.deposits.sort(
        (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
      ) ?? [];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof addDepositSchema>>({
    resolver: zodResolver(addDepositSchema),
  });

  const updateUserMutation = useUpdateUser();

  const addStock = handleSubmit(async ({ amount, date }) => {
    if (!stock) return;

    updateUserMutation.mutate(
      {
        id: user.id,
        user: {
          ...user,
          stocks: user.stocks.map((s) => {
            if (s.name !== stock) return s;
            return {
              ...s,
              deposits: [
                { amount, date: date.toISOString() } as Deposit,
                ...s.deposits,
              ],
            };
          }),
        },
      },
      {
        onSuccess() {
          reset();
        },
      }
    );
  });

  const removeDeposit = (id: string) => {
    if (!stock) return;

    updateUserMutation.mutate({
      id: user.id,
      user: {
        ...user,
        stocks: user.stocks.map((s) => {
          if (s.name !== stock) return s;
          return {
            ...s,
            deposits: s.deposits.filter((d) => d.id !== id),
          };
        }),
      },
    });
  };

  return (
    <div className="">
      <div className="flex items-center justify-between p-4 mx-auto max-w-xl mb-8">
        <p>Select stock:</p>
        <select
          className="bg-gray-100 dark:bg-zinc-800 rounded-md mt-1 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        >
          {user.stocks.map((stock) => (
            <option key={stock.name} value={stock.name}>
              {stock.name}
            </option>
          ))}
        </select>
      </div>

      {stock && (
        <div className="max-w-xl mx-auto space-y-8">
          <form
            onSubmit={addStock}
            className="border border-gray-200 dark:border-zinc-800 rounded-md p-4 pb-8"
          >
            <div className="flex flex-col items-center space-y-3 p-2">
              <h3 className="text-2xl font-medium">Add Deposit</h3>
            </div>

            <div className="py-2">
              <Input
                label="Amount"
                placeholder="Amount"
                type="number"
                className="bg-gray-100 dark:bg-zinc-800 rounded-md mt-1 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("amount", { valueAsNumber: true })}
                error={errors.amount?.message}
              />
            </div>
            <div className="py-2">
              <Input
                label="Date"
                placeholder="Date"
                type="datetime-local"
                className="bg-gray-100 dark:bg-zinc-800 rounded-md mt-1 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("date", { valueAsDate: true })}
                error={errors.date?.message}
              />
            </div>

            <Button
              loading={isSubmitting || updateUserMutation.isLoading}
              className="w-full py-4 mt-4 rounded-sm border border-blue-600 bg-blue-600 text-sm text-white font-medium"
            >
              Add Deposit
            </Button>
          </form>

          <div className="border border-gray-200 dark:border-zinc-800 rounded-md">
            <h4 className="text-lg font-medium px-4 py-2 border-b dark:border-zinc-800">
              Deposits history
            </h4>

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
                        <button
                          onClick={() => removeDeposit(deposit.id)}
                          className="self-end rounded-md py-1 px-2 bg-red-400 hover:bg-red-500 text-xs text-white font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center">
                <p>No deposits</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function RemoveUser({ user }: { user: Account }) {
  const router = useRouter();
  const removeUserMutation = useRemoveUser();

  const remove = () => {
    removeUserMutation.mutate(user.id, {
      onSuccess() {
        router.push({ pathname: "/settings", query: { view: "list" } });
      },
    });
  };

  return (
    <div className="rounded-xl bg-red-50 flex flex-col items-center justify-center gap-2 p-12">
      <p className="text-xs mb-2 text-red-500 font-medium">
        Clicking this button will permanently delete this account
      </p>
      <button
        onClick={remove}
        className="bg-red-400 hover:bg-red-500 text-white px-3 py-2 rounded-sm text-xs font-medium"
      >
        Remove Account
      </button>
      {removeUserMutation.isError && (
        <p className="text-center text-xs text-red-500">
          Unable to remove this account
        </p>
      )}
    </div>
  );
}
