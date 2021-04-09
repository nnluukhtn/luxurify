import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Typography } from 'antd';
import { Contract } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import ERC667ABI from '../../../../abi/ERC667.abi.json';

const WatchList = ({ address }) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const [watches, setWatches] = useState<any>([]);
  const history = useHistory();
  const { data: balance } = useSWR([address, 'balanceOf', account]);
  const contract = new Contract(address, ERC667ABI, library?.getSigner());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getWatchList = async () => {
      setIsLoading(true);
      let watchList: any[] = [];
      for (let i = 0; i < balance; i++) {
        const token = await contract.tokenOfOwnerByIndex(account, i);
        const watch = await contract.watches(token);
        const tokenURI = await contract.tokenURI(token);
        const tokenBreakdown = tokenURI?.split('/');
        console.log(tokenURI);
        const watchData = {
          tokenURI: tokenURI,
          id: tokenBreakdown[tokenBreakdown.length - 1],
          referenceNumber: watch.referenceNumber,
          name: watch.name,
        };
        watchList.push(watchData);
      }
      setWatches(watchList);
      setIsLoading(false);
    };
    getWatchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance, account, address]);

  return (
    <div
      style={{
        border: '1px solid orange',
        borderRadius: '10px',
        minHeight: 50,
        minWidth: 280,
        maxWidth: 500,
        padding: '1rem',
        overflow: 'scroll',
        margin: '2rem 0',
      }}
    >
      <Typography.Title level={4}>Owner's watch list</Typography.Title>
      {isLoading || !watches ? (
        <>Getting list...</>
      ) : Array.isArray(watches) ? (
        <ol>
          {watches.map((value, idx) => (
            <li key={`watch_${idx}`}>
              {value.tokenURI ? (
                <a href={`/watches/${value.id}`}>
                  {value.name} - {value.referenceNumber}
                </a>
              ) : (
                <>
                  {value.name} - {value.referenceNumber}
                </>
              )}
            </li>
          ))}
        </ol>
      ) : (
        'None'
      )}
      <br />
      Total: {balance && balance.toString()}
    </div>
  );
};

export default WatchList;
