type Props = React.ComponentPropsWithRef<"svg">

export const Diamond = (props: Props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            fill="#7CFFF9"
            d="M8.334 6.482l8 1.003 4.528-3.679-4.76-2.006-8.41.206L3.343 4.32l4.99 2.16z"
        ></path>
        <path
            fill="#00A5EC"
            d="M8.334 6.482l-2.006 5.582 11.576.386-2.136-5.968H8.334z"
        ></path>
        <path
            fill="#00DBFF"
            d="M15.769 6.482l5.093-2.676L24 7.15l-6.38 4.99-1.851-5.658z"
        ></path>
        <path
            fill="#00DCFF"
            d="M3.344 4.32L0 8.258l6.328 3.807 2.006-5.582-4.99-2.161z"
        ></path>
        <path
            fill="#105BC4"
            d="M6.328 12.064l6.045 10.418 5.248-10.341-11.293-.077z"
        ></path>
        <path
            fill="#2181E5"
            d="M0 8.257l12.373 14.225-6.045-10.418L0 8.257z"
        ></path>
        <path
            fill="#00AFFF"
            d="M24 7.15L12.373 22.482l5.248-10.341L24 7.15z"
        ></path>
        <path
            fill="#B6FFF9"
            d="M3.344 4.32l17.518-.514-4.76-2.006-8.41.206L3.343 4.32z"
        ></path>
        <path
            fill="#7CFFF9"
            d="M6.328 12.064s.437-2.804 2.006-5.582c-.385 2.34-2.006 5.582-2.006 5.582zM15.768 6.482c-.231 1.466 1.57 5.35 1.853 5.659-.077-1.93-1.852-5.66-1.852-5.66z"
        ></path>
    </svg>
)