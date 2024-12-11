import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { StakingProps } from "../../types/staking";

const { persistAtom } = recoilPersist();

export const stakingAtom = atom<StakingProps>({
  key: "stakingAtom",
  default: {
    telegramId: 0,
    address: "",
    principal: "",
    leverage: 0,
    lockup: 0,
    nominator: "",
    asset:"",
    tokenSort:"",
  },
  effects_UNSTABLE: [persistAtom],
});

export const stakingInputAtom = atom({
  key: "stakingInputAtom",
  default: "",
});
