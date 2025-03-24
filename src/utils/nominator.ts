export function transformNominatorName(name: string): string {
    switch (name) {
        case "Bemo Pool":
            return "Bemo Pool (CEX-DEX)";
        case "Arbitrage Bot":
            return "CEX-DEX";
        case "Arbitrage Bot 1":
            return "DEX-DEX";
        default:
            return name;
    }
}
