export interface stakeInfo {
  stakeInfos: nftInfo[];
}
export interface nftInfo {
  nftId: number;
  amount: number;
  principal: number;
  leverage: number;
  lockPeriod: number;
  timeStamp: string;
  nominator: string;
  status: number;
}
