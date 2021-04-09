import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Button, Row, Typography } from 'antd';
import { Spacer } from 'app/common/styles';
import { Contract } from 'ethers';
import React, { useState } from 'react';
import useSWR from 'swr';
import ERC667ABI from '../../../../abi/ERC667.abi.json';

const Actions = ({ address }) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const [isLoading, setLoading] = useState('');
  const [result, setResult] = useState<any>(null);
  const [watches, setWatches] = useState<any>(null);
  const { data: balance, mutate } = useSWR([address, 'balanceOf', account]);
  // const { data: watches, mutate } = useSWR([address, 'watches']);
  const contract = new Contract(address, ERC667ABI, library?.getSigner());

  const claimWatch = () => {
    // setLoading('claiming');
    contract.functions
      .claimNewWatch(33, 'Rolex Datejust 116189PAVEL', '116189PAVEL')
      .then(value => {
        console.log(value);
        setResult(value);
        setLoading('');
      });
  };

  const list = async () => {
    console.log('AVAILABLE FUNCTIONS: ', contract.functions);
    // contract.totalSupply().then(setResult);
    let watchList: any[] = [];
    for (let i = 0; i < balance; i++) {
      const token = await contract.tokenOfOwnerByIndex(account, i);
      const watch = await contract.watches(token);
      watchList.push(watch);
    }
    setWatches(watchList);

    // setResult();
  };

  const setTokenURI = result => {
    contract
      .setTokenURI(
        result,
        'https://gateway.pinata.cloud/ipfs/Qmb7JhjyTiNEZK8yujzjtR7moM1cS38mkqCEqdAM4EAsQT',
      )
      .then(setResult);
  };

  const getWatch = id => {
    contract.watches(id).then(setResult);
  };

  return (
    <div>
      <Typography.Title level={4}>Actions</Typography.Title>
      <Row>
        <Button loading={isLoading === 'claiming'} onClick={claimWatch}>
          Claim
        </Button>
        <Spacer width="0.6rem" />
        <Button loading={isLoading === 'listing'} onClick={list}>
          List
        </Button>
        <Spacer width="0.6rem" />
        <Button
          loading={isLoading === 'listing'}
          onClick={() => setTokenURI(result)}
        >
          Set Token
        </Button>
        <Spacer width="0.6rem" />
        <Button loading={isLoading === 'listing'} onClick={() => getWatch(14)}>
          Get Watch
        </Button>
      </Row>
      <Spacer height="1rem" />
      <div
        style={{
          border: '1px solid red',
          borderRadius: '10px',
          minHeight: 50,
          minWidth: 280,
          maxWidth: 500,
          padding: '1rem',
          overflow: 'scroll',
        }}
      >
        <Typography.Title level={4}>Result</Typography.Title>
        <pre>{JSON.stringify(result, null, 2)}</pre>
        <p>{result && result?.toString()}</p>
        {Array.isArray(watches) && (
          <ul>
            {watches.map((value, idx) => (
              <li key={`watch_${idx}`}>
                {idx}: {value.referenceNumber} - {value.name}
              </li>
            ))}
          </ul>
        )}
        {/* <pre>{JSON.stringify(watches, null, 2)}</pre> */}
        {/* {result && parseFloat(formatUnits(result, 18)).toPrecision(4)} */}
      </div>
    </div>
  );
};

export default Actions;
