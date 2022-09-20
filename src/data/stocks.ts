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

export const stocks: StockTemplate[] = [
    { name: "Apple", symbol: "NASDAQ:AAPL", icon: "/icons/apple.svg", overview: "AAPL|1D" },
    { name: "Meta", symbol: "NASDAQ:META", icon: "/icons/meta.svg", overview: "META|1D" },
    { name: "Google", symbol: "NASDAQ:GOOGL", icon: "/icons/alphabet.svg", overview: "GOOGL|1D" },
    { name: "Microsoft", symbol: "NASDAQ:MSFT", icon: "/icons/microsoft.svg", overview: "MSFT|1D" },
    { name: "Tesla", symbol: "NASDAQ:TSLA", icon: "/icons/tesla.svg", overview: "TSLA|1D" },
    { name: "Bluerock", symbol: "AMEX:BRG", icon: "/icons/usa.svg", overview: "AMEX:BRG|1D" },
    { name: "Dow Jones", symbol: "AMEX:DIA", icon: "/icons/usa.svg", overview: "AMEX:DIA|1D" }
]

export function findStock(stock: string): StockTemplate | undefined {
    return stocks.find(s => s.name.toLowerCase() === stock.toLowerCase())
}
