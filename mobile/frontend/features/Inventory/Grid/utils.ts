import axios from "axios";
import toNumber from "lodash/toNumber";
import { Contract } from "web3-eth-contract";
import { defaultHeader } from "../../../constants";
import { Watch, WatchMeta } from "../../../types";

interface Props {
  token: string;
  contract: Contract;
}

interface TokenProps {
  account: string;
  index: number;
  contract: Contract;
}

interface ListProps {
  account: string;
  contract: Contract;
}

export const getToken = async ({
  account,
  index,
  contract,
}: TokenProps): Promise<any> => {
  const contractData = await contract.methods
    .tokenOfOwnerByIndex(account, index)
    .call();
  return contractData;
};

export const getWatch = async ({ token, contract }: Props): Promise<Watch> => {
  const contractData: Watch = await contract.methods.watches(token).call();
  return contractData;
};

export const getWatchMeta = async (refNum: string): Promise<WatchMeta> => {
  const response = await axios({
    method: "get",
    url: `https://api.watchsignals.com/watch/referencenumber/${refNum}`,
    headers: defaultHeader as any,
  });
  const data: WatchMeta = response.data.data[0];
  return data;
};

export const getWatchListByAccount = async ({
  contract,
  account,
}: ListProps): Promise<Array<Watch & Partial<WatchMeta>>> => {
  const totalIndex = toNumber(await contract.methods.balanceOf(account).call());
  const watches: Array<Watch & Partial<WatchMeta>> = [];

  for (let index = 0; index < totalIndex; index++) {
    const token = await getToken({ account, index, contract });
    const watch = await getWatch({ contract, token });
    const meta = await getWatchMeta(watch.referenceNumber).catch(() => ({}));
    watches.push({ ...watch, ...meta });
  }

  return watches;
};
