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

export function mapStrategyHandler(handler) {
  if (import.meta.env.VITE_TON_NETWORK === "mainnet") {
    if (handler === "Bemo Pool") return Address.parse("EQDH13TaSeQVHHf9YOeG4y3A0VrkYn8y24WESaJIui3BujDc");
    if (handler === "Evaa Pool") return Address.parse("EQCbi1QITvphx3b_vSja2CEcP3E8SH_H5gYEi1PdyfhCRdhc");
  }
  if (import.meta.env.VITE_TON_NETWORK === "testnet") {
    if (handler === "Bemo Pool") return Address.parse("kQDyV2q5-epazG6SffES6v9QPlNzeFC19uy71TPjXwXd0bLg");
    if (handler === "Evaa Pool") return Address.parse("kQBcQ1g65ebK7c8AJXTkgivJkiltU99iPJ5d8wGSYmCafLrK");
  }
}

export function mapStrategyFee(handler) {
  if (import.meta.env.VITE_TON_NETWORK === "mainnet")
    if (handler === "Bemo Pool")
      return {
        fee: toNano(0.2),
        fwd: toNano(0.1),
      };
  if (handler === "Evaa Pool")
    return {
      fee: toNano(0.5),
      jettonFwd: toNano(0.45),
      fwd: toNano(0.45),
    };
  if (import.meta.env.VITE_TON_NETWORK === "testnet") {
    if (handler === "Bemo Pool")
      return {
        fee: toNano(0.2),
        fwd: toNano(0.1),
      };
    if (handler === "Evaa Pool")
      return {
        fee: toNano(0.5),
        jettonFwd: toNano(0.45),
        fwd: toNano(0.45),
      };
  }
}
