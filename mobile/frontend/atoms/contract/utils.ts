import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import { contractState } from "./atoms";
import { Contract } from "web3-eth-contract";
import Luxurify from "../../../contracts/Luxurify.json";
import { ConnectorContext } from "../../ConnectorContext";
import Web3 from "web3";

export const initializeContract = (web3: Web3, account: string): Contract => {
  const options = {
    from: account,
    data: Luxurify.bytecode,
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

export const useContract = ({ account }: Props) => {
  const web3 = useContext(ConnectorContext);
  const [contract, setContract] = useRecoilState(contractState);

  useEffect(() => {
    if (!contract) {
      const newContract = initializeContract(web3, account);
      web3.eth.defaultAccount = account;

      // Event listener handlers
      setContract(newContract);
    }
  }, []);

  return contract;
};
