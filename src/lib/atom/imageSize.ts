import { atom } from "recoil";
import { ImageSizeProps } from "../../types/imageSize";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const imageSizeAtom = atom<ImageSizeProps>({
  key: "imageSizeAtom",
  default: {
    width: 0,
    height: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
