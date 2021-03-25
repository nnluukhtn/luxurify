import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import ERC20ABI from '../../../../abi/ERC20.abi.json';

const EthBalance = () => {
  const { account, library } = useWeb3React<Web3Provider>();
  const { data: balance, mutate } = useSWR(['getBalance', account, 'latest'], {
    fetcher: fetcher(library, ERC20ABI),
  });

  useEffect(() => {
    // listen for changes on an Ethereum address
    console.log(`listening for blocks...`);
    library?.on('block', () => {
      console.log('update balance...');
      mutate(undefined, true);
    });
    // remove listener when the component is unmounted
    return () => {
      library?.removeAllListeners('block');
    };
    // trigger the effect only on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!balance) {
    return <div>...</div>;
  }
  return <div>{parseFloat(formatEther(balance)).toPrecision(4)} ΞTH</div>;
};

export default EthBalance;
