import { atom } from "recoil";
import { StakingProps } from "../../types/staking";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const stakingAtom = atom<StakingProps>({
  key: "stakingAtom",
  default: {
    id: 0,
    address: "",
    principal: "",
    leverage: 0,
    lockup: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
