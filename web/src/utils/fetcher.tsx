import { Web3Provider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import { isAddress } from 'ethers/lib/utils';

// const fetcher = (library: Web3Provider | undefined) => (...args) => {
//   const [method, ...params] = args;
//   console.log(method, params);
//   return library?.[method](...params);
// };

const fetcher = (library: Web3Provider | undefined, abi?: any) => (...args) => {
  const [arg1, arg2, ...params] = args;
  // it's a contract
  if (isAddress(arg1) && library !== undefined) {
    const address = arg1;
    const method = arg2;
    const contract = new Contract(address, abi, library.getSigner());
    return contract[method](...params);
  }
  // it's a eth call
  const method = arg1;
  return library?.[method](arg2, ...params);
};

export default fetcher;
