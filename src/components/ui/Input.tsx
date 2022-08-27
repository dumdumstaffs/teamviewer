import React, { forwardRef } from "react"

type Props = {
    label: string,
    info: string,
    error?: string
} & React.ComponentPropsWithoutRef<"input">

export const Input = forwardRef<HTMLInputElement, Props>(({ children, type, label, info, error, className, ...props }, ref) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium mb-1" htmlFor={props.id}>{label}</label>
        <p className="text-xs mb-2">{info} <span className="text-red-500">*</span></p>
        <input className={className} type={type || "text"} ref={ref} {...props} />
        {error && (
            <span className="mt-2 text-xs text-red-400">{error}</span>
        )}
    </div>
))

Input.displayName = "Input"
