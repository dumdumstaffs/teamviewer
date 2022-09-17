import Link from "next/link";

export function ViewLink({ view, active, disabled }: { view: string, active: boolean, disabled?: boolean }) {
    return (
        <Link href={disabled ? "/settings" : { pathname: "/settings", query: { view: view.toLowerCase() } }}>
            <a>
                <div className={`flex flex-col items-center justify-between px-8 py-6 w-32 rounded-xl ${active ? "bg-blue-500/20" : "bg-gray-50 dark:bg-zinc-800"}  transition-all sm:hover:scale-105 cursor-pointer`}>
                    <div className="flex flex-col items-center text-sm">
                        <p>{view}</p>
                    </div>
                </div>
            </a>
        </Link>
    )
}
