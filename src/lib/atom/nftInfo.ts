import { atom } from "recoil";
import { nftInfo } from "../../types/Nft";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const nftInfoAtom = atom<nftInfo>({
  key: "nftInfoAtom",
  default: {
    nftId: 0,
    amount: 0,
    leverage: 0,
    lockPeriod: 0,
    timeStamp: "",
    nominator: "",
    status: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
