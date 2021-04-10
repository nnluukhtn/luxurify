import _ from "lodash";
import axios from "axios";
import web3 from "web3";
import { Contract } from "web3-eth-contract";
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

export const getWatchMeta = async ({
  token,
  contract,
}: Props): Promise<Partial<WatchMeta>> => {
  const meta = await contract.methods
    .getTokenURI(web3.utils.toHex(token))
    .call();

  const response = await axios({
    method: "get",
    url: meta,
  }).catch(() => undefined);

  if (!response?.data) return {};

  const data: WatchMeta = _.reduce(
    response.data.attributes,
    (acc, { trait_type, value }) => ({
      ...acc,
      [trait_type.replaceAll(" ", "_").toLowerCase()]: value,
    }),
    {}
  ) as WatchMeta;

  return {
    name: response.data.name,
    description: response.data.description,
    image: response.data.image,
    ...data,
  };
};

export const getWatchListByAccount = async ({
  contract,
  account,
}: ListProps): Promise<Array<Watch & Partial<WatchMeta>>> => {
  const totalIndex = _.toNumber(await contract.methods.balanceOf(account).call());
  const watches: Array<Watch & Partial<WatchMeta>> = [];

  for (let index = 0; index < totalIndex; index++) {
    const token = await getToken({ account, index, contract });
    const watch = await getWatch({ contract, token });
    const meta = await getWatchMeta({ contract, token });
    watches.push({ ...watch, ...meta, token });
  }

  return watches;
};
