import { atom } from "recoil";
import { Watch, WatchMeta } from "../../../types";

const initialValue: Array<Watch & Partial<WatchMeta>> = [];

export const watchListState = atom({
  key: "watchList", // unique ID (with respect to other atoms/selectors)
  default: initialValue, // default value (aka initial value)
});
