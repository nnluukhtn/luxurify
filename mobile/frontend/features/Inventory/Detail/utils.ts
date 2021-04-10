import { Contract } from "web3-eth-contract";
import { Watch, WatchMeta } from "../../../types";
import {
  getOrders,
  getWatch,
  getWatchMeta,
  OrderResponse,
} from "../Grid/utils";
import { OpenSeaPort } from "opensea-js";

interface GetComposedDataProps {
  token: string;
  contract: Contract;
  seaport: OpenSeaPort;
  account: string;
}

export const getComposedData = async ({
  seaport,
  account,
  contract,
  token,
}: GetComposedDataProps): Promise<
  Watch & OrderResponse & Partial<WatchMeta>
> => {
  const watch = await getWatch({ contract, token });
  const meta = await getWatchMeta({ contract, token });
  const orders = await getOrders({ seaport, token, account });
  return { ...watch, ...meta, ...orders, token };
};
