import { atom } from "recoil";
import { StakingProps } from "../../types/staking";
export const stakingAtom = atom<StakingProps[]>({
  key: "stakingAtom",
  default: [],
});
