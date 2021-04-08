import { Contract } from "web3-eth-contract";
import { atom } from "recoil";

const initialValue: Contract | null = null;

export const contractState = atom({
  key: "contract", // unique ID (with respect to other atoms/selectors)
  default: initialValue, // default value (aka initial value)
});
