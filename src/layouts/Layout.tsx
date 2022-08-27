import { Spinner } from "@/components/icons/Spinner";
import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/header/Header";
import { useAccount } from "@/hooks/use-account";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, ReactNode, useEffect, useState } from "react";

type Props = {
    title?: string,
    description?: string,
    mode?: "auth" | "guest",
    children: ReactNode
}

export function Layout({ title, description, mode, children }: Props) {
    const router = useRouter()
    const [display, setDisplay] = useState(false)

    const { account, isReady } = useAccount()

    useEffect(() => {
        if (!isReady) return

        if (mode === "auth") {
            if (!account) router.push("/")
            else setDisplay(true)
        }
        if (mode === "guest") {
            if (account) router.push("/account")
            else setDisplay(true)
        }

        const displayTimeout = setTimeout(() => {
            setDisplay(true)
        }, 1000)

        return () => clearTimeout(displayTimeout)

    }, [mode, isReady, account])

    return (
        <Fragment>
            <Head>
                <title>{title || "TeamViewer - Cryptocurrency"}</title>
                <meta name="description" content={description || "Cryptocurrency & Stocks"} />
                <link rel="shortcut icon" type="image/png" href="/favicon.png" />
                <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0" id="viewport" />
            </Head>

            <Header />
            <main>
                {display ? children : (
                    <div className="flex items-center justify-center w-full h-[70vh]">
                        <Spinner className="w-10 h-10 text-blue-600" />
                    </div>
                )}
            </main>
            <Footer />
        </Fragment>
    )
}