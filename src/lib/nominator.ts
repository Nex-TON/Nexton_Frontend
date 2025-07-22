import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { NominatorProps } from "@/types/nominator";

const { persistAtom } = recoilPersist();

export const nominatorAtom = atom<NominatorProps>({
  key: "nominatorAtom",
  default: {
    id: 0,
    name: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const stakingInputAtom = atom({
  key: "stakingInputAtom",
  default: "",
});
