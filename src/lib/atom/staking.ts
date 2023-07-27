import { atom } from "recoil";
import { StakingProps } from "../../types/staking";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const stakingAtom = atom<StakingProps[]>({
  key: "stakingAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
