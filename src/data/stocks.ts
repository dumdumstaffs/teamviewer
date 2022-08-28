export type Stock = {
    name: string,
    symbol: string,
    icon: string,
    overview: string
}

export const apple: Stock = { name: "Apple", symbol: "NASDAQ:AAPL", icon: "/icons/apple.svg", overview: "AAPL|1D" }
export const meta: Stock = { name: "Meta", symbol: "NASDAQ:META", icon: "/icons/meta.svg", overview: "META|1D" }
export const google: Stock = { name: "Google", symbol: "NASDAQ:GOOGL", icon: "/icons/alphabet.svg", overview: "GOOGL|1D" }
export const microsoft: Stock = { name: "Microsoft", symbol: "NASDAQ:MSFT", icon: "/icons/microsoft.svg", overview: "MSFT|1D" }
export const tesla: Stock = { name: "Tesla", symbol: "NASDAQ:TSLA", icon: "/icons/tesla.svg", overview: "TSLA|1D" }
export const bluerock: Stock = { name: "Bluerock", symbol: "AMEX:BRG", icon: "/icons/usa.svg", overview: "AMEX:BRG|1D" }
export const dowjones: Stock = { name: "Dow Jones", symbol: "AMEX:DIA", icon: "/icons/usa.svg", overview: "AMEX:DIA|1D" }
