import { Spinner } from "@/components/icons/Spinner";
import { clientConfig } from "@/config/client-env";
import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/header/Header";
import { useAccount } from "@/hooks/use-account";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, ReactNode } from "react";

type Props = {
  title?: string;
  description?: string;
  mode?: "auth" | "guest";
  children: ReactNode;
};

export function Layout({ title, description, mode, children }: Props) {
  const router = useRouter();

  const account = useAccount();

  if (mode === "auth" && account.isError) {
    router.push("/");
    return null;
  }

  if (mode === "guest" && account.isSuccess) {
    router.push("/account");
    return null;
  }

  return (
    <Fragment>
      <Head>
        <title>{title || clientConfig.app.NAME}</title>
        <meta
          name="description"
          content={description || "Cryptocurrency & Stocks"}
        />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0"
          id="viewport"
        />
      </Head>

      <Header />
      <main>
        {account.isLoading ? (
          <div className="flex items-center justify-center w-full h-[70vh]">
            <Spinner className="w-10 h-10 text-blue-600" />
          </div>
        ) : mode === "auth" && account.isSuccess ? (
          children
        ) : mode === "guest" && account.isError ? (
          children
        ) : null}
      </main>
      <Footer />
    </Fragment>
  );
}
