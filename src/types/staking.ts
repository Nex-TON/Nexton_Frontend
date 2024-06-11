export interface StakingProps {
  telegramId: number;
  address: string;
  principal: string;
  leverage: number;
  lockup: number;
  nominator: string;
}

export interface UnstakingProps {
  telegramId: number;
  nftId: number;
  address: string;
}
