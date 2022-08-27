import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"
import { useTheme } from "next-themes"
import { useMountedState } from "react-use"

export function ThemeSwitcher() {
    const mounted = useMountedState()
    const { resolvedTheme, setTheme } = useTheme()

    const toggleTheme = () => setTheme(resolvedTheme === "light" ? "dark" : "light")

    if (!mounted()) return null

    return (
        <button onClick={() => toggleTheme()}>
            {resolvedTheme === "light" ? (
                <MoonIcon className="w-5 h-5" />
            ) : (
                <SunIcon className="w-5 h-5" />
            )}
        </button>
    )
}