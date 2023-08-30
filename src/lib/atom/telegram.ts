import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const telegramAtom = atom({
  key: "telegramAtom",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
