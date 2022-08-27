type Props = {
    title: string,
    info: string,
}

export function ErrorBanner({ title, info }: Props) {
    return (
        <div className="bg-red-100 dark:bg-red-200 text-red-700 mt-2 p-4 rounded-md text-xs">
            <p className="text-sm font-medium mb-1">{title}</p>
            <p>{info}</p>
        </div>
    )
}