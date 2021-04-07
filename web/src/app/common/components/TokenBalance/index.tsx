import { Web3Provider } from '@ethersproject/providers';
import { formatUnits } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, Contract } from 'ethers';
import React, { useEffect } from 'react';
import useSWR from 'swr';
// import ERC20ABI from '../../../../abi/ERC20.abi.json';
import ERC667ABI from '../../../../abi/ERC667.abi.json';

const TokenBalance = ({ symbol, address, decimals }) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const { data: balance, mutate } = useSWR([address, 'balanceOf', account]);

  useEffect(() => {
    // listen for changes on an Ethereum address
    console.log(`listening for Transfer...`);
    const contract = new Contract(address, ERC667ABI, library?.getSigner());

    const fromMe = contract.filters.Transfer(account, null);

    library?.on(fromMe, (from, to, amount, event) => {
      console.log('Transfer|sent', { from, to, amount, event });
      mutate(undefined, true);
    });

    const toMe = contract.filters.Transfer(null, account);

    library?.on(toMe, (from, to, amount, event) => {
      console.log(
        `Transfer|received, from: ${JSON.stringify(
          from,
          null,
          2,
        )} to: ${JSON.stringify(to, null, 2)} amount: ${JSON.stringify(
          amount,
        )} event: ${JSON.stringify(event)}`,
      );
      mutate(undefined, true);
    });

    // remove listener when the component is unmounted
    return () => {
      library?.removeAllListeners(toMe);
      library?.removeAllListeners(fromMe);
    };
    // trigger the effect only on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!balance) {
    return null;
  }
  return (
    <div>
      {balance && BigNumber.from(balance).toNumber()} {symbol}
      {/* {parseFloat(formatUnits(balance, decimals)).toPrecision(4)} {symbol} */}
    </div>
  );
};

export default TokenBalance;
