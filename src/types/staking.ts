export interface StakingProps {
  id: number;
  address: string;
  principal: string;
  leverage: number;
  lockup: number;
}

export interface UnstakingProps {
  telegramId: number;
  nftId: number;
  address: string;
}
