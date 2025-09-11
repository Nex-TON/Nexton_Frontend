export function transformNominatorName(name: string): string {
    switch (name) {
        case "Bemo Pool":
            return "Bemo Pool (CEX-DEX)";
        case "Evaa Pool":
            return "Evaa Pool (CEX-DEX)";
        case "Bidask":
            return "BidAsk Arbitrage Vault";
        case "Arbitrage Bot":
            return "CEX-DEX";
        case "Arbitrage Bot 1":
            return "DEX-DEX";
        case "Arbitrage Bot 2":
            return "CEX-DEX";
        case "Arbitrage Bot 3":
            return "DEX-DEX"
        default:
            return name;
    }
}
