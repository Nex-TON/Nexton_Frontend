import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { ImageSizeProps } from "../../types/imageSize";

const { persistAtom } = recoilPersist();

export const imageSizeAtom = atom<ImageSizeProps>({
  key: "imageSizeAtom",
  default: {
    width: 0,
    height: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
