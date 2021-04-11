import _ from "lodash";
import web3 from "web3";
import axios from "axios";
import { OpenSeaPort } from "opensea-js";
import { Contract } from "web3-eth-contract";
import { Watch, WatchMeta } from "../../../types";
import WatchData from "../../../types/WatchData";
import OrderResponse from "../../../types/OrderResponse";

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
  seaport: OpenSeaPort;
}

interface GetOrderProps {
  account: string;
  seaport: OpenSeaPort;
  token: string;
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
  const contractData: any[] = await contract.methods.getWatchInfo(token).call();

  const BN = web3.utils.toBN;

  return {
    name: contractData[1],
    randomId: contractData[0],
    referenceNumber: contractData[2],
    priceType: _.toNumber(contractData[3]),
    priceUnit: _.toNumber(contractData[4]),
    priceFixed: BN(contractData[5]).toString(),
    token,
  };
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
  seaport,
  contract,
  account,
}: ListProps): Promise<Array<WatchData>> => {
  const totalIndex = _.toNumber(
    await contract.methods.balanceOf(account).call()
  );
  const watches: Array<WatchData> = [];

  for (let index = 0; index < totalIndex; index++) {
    const token = await getToken({ account, index, contract });
    const watch = await getWatch({ contract, token });
    const meta = await getWatchMeta({ contract, token });
    const order = await getOrders({ token, account, seaport });
    const ownerHash: string = await contract.methods.ownerOf(token);
    watches.push({
      ...watch,
      ...meta,
      ...order,
      token,
      isOwner: ownerHash === account,
    });
  }

  return watches;
};

export const getOrders = async ({
  token,
  seaport,
  account,
}: GetOrderProps): Promise<OrderResponse> => {
  const orders = ((await seaport.api
    .getOrders({
      owner: account,
      token_id: token,
    })
    .catch(() => ({ orders: [], count: 0 }))) as unknown) as OrderResponse;
  return { orders: orders.orders, count: orders.orders.length };
};
