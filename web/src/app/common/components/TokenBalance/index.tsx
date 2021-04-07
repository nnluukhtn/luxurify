import { Web3Provider } from '@ethersproject/providers';
import { formatUnits } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Button } from 'antd';
import { Contract } from 'ethers';
import React, { useEffect } from 'react';
import useSWR from 'swr';
// import ERC20ABI from '../../../../abi/ERC20.abi.json';
import ERC667ABI from '../../../../abi/ERC667.abi.json';

const TokenBalance = ({ symbol, address, decimals }) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const { data: balance, mutate } = useSWR([address, 'balanceOf', account]);

  const claimWatch = () => {
    const contract = new Contract(address, ERC667ABI, library?.getSigner());
    contract.functions
      .claimNewWatch(33, 'Rolex Datejust 116189PAVEL', '116189PAVEL')
      .then(console.log);
  };

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
      console.log('Transfer|received', { from, to, amount, event });
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
      {parseFloat(formatUnits(balance, decimals)).toPrecision(4)} {symbol}
      <br />
      balance {JSON.stringify(balance, null, 2)}
      <br />
      <Button onClick={claimWatch}>Claim</Button>
    </div>
  );
};

export default TokenBalance;
