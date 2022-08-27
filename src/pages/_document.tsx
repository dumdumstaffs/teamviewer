import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en-us" dir="ltr">
            <Head />
            <body className="bg-white dark:bg-zinc-900 duration-500">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
