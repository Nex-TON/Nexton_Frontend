import { Address, fromNano, toNano } from "@ton/core";

export function mapTokenMasterAddress(token) {
  switch (token) {
    case "nxTON":
      return Address.parse(import.meta.env.VITE_NXTON_MASTER);
    case "oldNxTON":
      if (import.meta.env.VITE_TON_NETWORK == "mainnet")
        return Address.parse("EQCdEj1dEh76-Qacc38ZRH2eGtqyp-50fO3_0wBKF8HKT9zh");
      else if (import.meta.env.VITE_TON_NETWORK == "testnet")
        return Address.parse("kQAUupHzEYK1B9yvg9qhaGFJqF-EcAgW58HjDs438pSex9Gu");
    case "USDT":
      if (import.meta.env.VITE_TON_NETWORK == "mainnet")
        return Address.parse("EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs");
      else if (import.meta.env.VITE_TON_NETWORK == "testnet")
        return Address.parse("kQBe4gtSQMxM5RpMYLr4ydNY72F8JkY-icZXG1NJcsju8XM7");
  }
  return null;
}

export function amountToString(token: string, amount: bigint) {
  switch (token) {
    case "nxTON":
    case "TON":
      return fromNano(amount);
    case "USDT":
      const divisor = 1000000n;
      const integerPart = amount / divisor;
      const fractionalPart = amount % divisor;
      return integerPart.toString() + "." + fractionalPart.toString().padStart(6, "0");
  }
}

export function stringToAmount(token: string, amount: string) {
  switch (token) {
    case "nxTON":
    case "TON":
      return toNano(amount);
    case "USDT":
      return toNano(amount) / 1000n;
  }
}
