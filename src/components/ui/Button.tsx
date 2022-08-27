import { Spinner } from "@/components/icons/Spinner"
import React, { forwardRef } from "react"

type Props = {
    loading?: boolean,
} & React.ComponentPropsWithoutRef<"button">

export const Button = forwardRef<HTMLButtonElement, Props>(({ children, className, loading, ...props }, ref) => (
    <button
        ref={ref}
        disabled={loading}
        className={`flex items-center justify-center ${className}`}
        {...props}
    >
        {loading ? <Spinner className="w-6 h-6" /> : children}
    </button>
))

Button.displayName = "Button"
