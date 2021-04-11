import { Contract } from "web3-eth-contract";
import { WatchData } from "../../../types";
import { getOrders, getWatch, getWatchMeta } from "../Grid/utils";
import { OpenSeaPort } from "opensea-js";

interface GetComposedDataProps {
  token: string;
  contract: Contract;
  seaport: OpenSeaPort;
  toCheckAccount: string;
  account: string;
}

export const getComposedData = async ({
  seaport,
  account,
  toCheckAccount,
  contract,
  token,
}: GetComposedDataProps): Promise<WatchData> => {
  const watch = await getWatch({ contract, token });
  const meta = await getWatchMeta({ contract, token });
  const orders = await getOrders({ seaport, token, account });
  return {
    ...watch,
    ...meta,
    ...orders,
    token,
    isOwner: toCheckAccount === account,
  };
};
