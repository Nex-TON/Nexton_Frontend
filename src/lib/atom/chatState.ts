import { atom } from "recoil";
export const chatState = atom<number>({
  key: "chat",
  default: 0,
});
