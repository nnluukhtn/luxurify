import axios from "axios";
import web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Watch, WatchMeta } from "../../../types";
import { getWatch, getWatchMeta } from "../Grid/utils";

interface GetComposedDataProps {
  token: string;
  contract: Contract;
}

export const getComposedData = async ({
  contract,
  token,
}: GetComposedDataProps): Promise<Watch & Partial<WatchMeta>> => {
  const watch = await getWatch({ contract, token });
  const meta = await getWatchMeta({ contract, token });
  return { ...watch, ...meta, token };
};
