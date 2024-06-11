import { LP_POOL } from "../constants/Lp Pool";

export const getProtocolFee = (principal: string, leverage: number) => {
  return ((360 * leverage * Number(principal)) / LP_POOL + 2) / 10;
};
