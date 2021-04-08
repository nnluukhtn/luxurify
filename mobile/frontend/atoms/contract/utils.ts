import { Contract } from "web3-eth-contract";
import Luxurify from "../../../contracts/Luxurify.json";
import Web3 from "web3";

export const initializeContract = (web3: Web3, account: string): Contract => {
  const options = {
    from: account,
  };

  const contract = new web3.eth.Contract(
    Luxurify.abi as any,
    Luxurify.contract_address,
    options
  );

  return (contract as unknown) as Contract;
};

interface Props {
  account: string;
}
