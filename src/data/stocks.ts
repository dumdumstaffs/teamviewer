export type Stock = {
    name: string,
    profit: number,
    symbol: string,
    overview: string,
}

type StockTemplate = {
    name: string,
    symbol: string,
    icon: string,
    overview: string,
}

export const apple: StockTemplate = { name: "Apple", symbol: "NASDAQ:AAPL", icon: "/icons/apple.svg", overview: "AAPL|1D" }
export const meta: StockTemplate = { name: "Meta", symbol: "NASDAQ:META", icon: "/icons/meta.svg", overview: "META|1D" }
export const google: StockTemplate = { name: "Google", symbol: "NASDAQ:GOOGL", icon: "/icons/alphabet.svg", overview: "GOOGL|1D" }
export const microsoft: StockTemplate = { name: "Microsoft", symbol: "NASDAQ:MSFT", icon: "/icons/microsoft.svg", overview: "MSFT|1D" }
export const tesla: StockTemplate = { name: "Tesla", symbol: "NASDAQ:TSLA", icon: "/icons/tesla.svg", overview: "TSLA|1D" }
export const bluerock: StockTemplate = { name: "Bluerock", symbol: "AMEX:BRG", icon: "/icons/usa.svg", overview: "AMEX:BRG|1D" }
export const dowjones: StockTemplate = { name: "Dow Jones", symbol: "AMEX:DIA", icon: "/icons/usa.svg", overview: "AMEX:DIA|1D" }

export const stockTemplates = [
    apple,
    meta,
    google,
    microsoft,
    tesla,
    bluerock,
    dowjones
]