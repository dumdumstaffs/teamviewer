import { ErrorBanner } from "@/components/forms/ErrorBanner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCreateUser } from "@/hooks/use-users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const createSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
  isAdmin: z.boolean().optional(),
});

export function Create() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
  });

  const createUserMutation = useCreateUser();

  const create = handleSubmit(async (userData) => {
    createUserMutation.mutate(userData, {
      onSuccess() {
        router.push({ pathname: "/settings", query: { view: "list" } });
      },
      onError() {
        setError("Something went wrong");
      },
    });
  });

  return (
    <form
      onSubmit={create}
      className="mx-auto border border-gray-200 dark:border-zinc-800 rounded-md w-full max-w-lg p-4 pb-8"
    >
      <div className="flex flex-col items-center space-y-3 p-2">
        <h3 className="text-2xl font-medium">Create Account</h3>
      </div>
      {error === "invalid_credentials" && (
        <ErrorBanner
          title="Authentication failed!"
          info="Incorrect Account ID, please try again with the correct credentials."
        />
      )}

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
          label="Email"
          placeholder="Email"
          className="bg-gray-100 dark:bg-zinc-800 rounded-md mt-1 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>
      <div className="py-2">
        <Input
          label="Password"
          placeholder="Password"
          className="bg-gray-100 dark:bg-zinc-800 rounded-md mt-1 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("password")}
          error={errors.password?.message}
        />
      </div>
      <div className="py-2">
        <label className="flex space-x-4 items-center">
          <input
            type="checkbox"
            className="bg-gray-100 dark:bg-zinc-800 rounded-md px-3 text-sm focus:outline-none focus:ring-none"
            {...register("isAdmin")}
          />
          <span className="text-sm">Is Admin?</span>
        </label>
      </div>

      <Button
        loading={isSubmitting || createUserMutation.isLoading}
        className="w-full py-4 mt-4 rounded-sm border border-blue-600 bg-blue-600 text-sm text-white font-medium"
      >
        Create
      </Button>
    </form>
  );
}
