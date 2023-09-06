export interface StakingProps {
  id: number;
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
