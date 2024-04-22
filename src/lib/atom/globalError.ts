import { atom } from "recoil";

export const globalError = atom({
  key: "errorState",
  default: null,
});
