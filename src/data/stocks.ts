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
    { name: "Dow Jones", symbol: "AMEX:DIA", icon: "/icons/usa.svg", overview: "AMEX:DIA|1D" },
    { name: "Exxon Mobil Corporation", symbol: "NYSE:XOM", icon: "/icons/exxon.svg", overview: "NYSE:XOM|1D" },
    { name: "Amazon", symbol: "NASDAQ:AMZN", icon: "/icons/amazon.svg", overview: "NASDAQ:AMZN|1D" },
    { name: "NVIDIA Corporation", symbol: "NASDAQ:NVDA", icon: "/icons/nvidia.svg", overview: "NASDAQ:NVDA|1D" },
    { name: "Netflix", symbol: "NASDAQ:NFLX", icon: "/icons/netflix.svg", overview: "NASDAQ:NFLX|1D" },
    { name: "Invesco QQQ Trust", symbol: "NASDAQ:QQQ", icon: "/icons/invesco.svg", overview: "NASDAQ:QQQ|1D" },
    { name: "AMD", symbol: "NASDAQ:AMD", icon: "/icons/amd.svg", overview: "NASDAQ:AMD|1D" },
    { name: "ProShares UltraPro QQQ", symbol: "NASDAQ:TQQQ", icon: "/icons/proshares.svg", overview: "NASDAQ:TQQQ|1D" },
    { name: "Snap Inc", symbol: "NYSE:SNAP", icon: "/icons/snap.svg", overview: "NYSE:SNAP|1D" },
    { name: "SASA POLYESTER", symbol: "BIST:SASA", icon: "/icons/sasa-polyester.svg", overview: "BIST:SASA|1D" },
    { name: "Alibaba Group Holding Limited", symbol: "NYSE:BABA", icon: "/icons/alibaba.svg", overview: "NYSE:BABA|1D" },
    { name: "AMC Entertainment Holdings", symbol: "NYSE:AMC", icon: "/icons/amc.svg", overview: "NYSE:AMC|1D" },
]

export function findStock(stock: string): StockTemplate | undefined {
    return stocks.find(s => s.name.toLowerCase() === stock.toLowerCase())
}
