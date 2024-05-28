import { PoolType } from "@/components/stake/Nominator/NominatorItem";

type NominatorType = "bot" | "pool";

export interface INominator {
  id: number;
  type: NominatorType;
  title: string;
  apy?: number;
  totalStake: number;
  pool: PoolType;
  profit: boolean;
  check: boolean;
  tag?: string;
  description: string;
}

export const NOMINATOR_LIST: INominator[] = [
  {
    id: 1,
    type: "pool" as NominatorType,
    title: "Bemo Pool",
    apy: 3.8,
    totalStake: 822.056,
    pool: "bemo" as PoolType,
    profit: true,
    check: false,
    tag: "+arb bot 12%",
    description: "you will receive an NFT through the Arbitrage Bot.",
  },
  {
    id: 2,
    type: "pool" as NominatorType,
    title: "Nominator Pool",
    totalStake: 937.263,
    pool: "nominator" as PoolType,
    profit: false,
    check: false,
    description: "you will receive an NFT through the Arbitrage Bot.",
  },
  {
    id: 3,
    type: "bot" as NominatorType,
    title: "Arbitrage Bot",
    apy: 12,
    totalStake: 754.197,
    pool: "arbitrage" as PoolType,
    profit: true,
    check: false,
    tag: "+Bonus Point",
    description: "you can directly invest in the Arbitrage Bot.",
  },
];
