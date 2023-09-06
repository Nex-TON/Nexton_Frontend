import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const nominatorAtom = atom({
  key: "nominatorAtom",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
