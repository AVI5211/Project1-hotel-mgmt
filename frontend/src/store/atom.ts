import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: !!localStorage.getItem("token"),
  },
});

export const userState = atom({
  key: "userState",
  default: {},
});
