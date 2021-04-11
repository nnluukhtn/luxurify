import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Button, Row, Typography } from 'antd';
import { Spacer } from 'app/common/styles';
import { Contract } from 'ethers';
import React, { useState } from 'react';
import useSWR from 'swr';
import ERC721ABI from 'app/abi/ERC721.abi.json';

const Actions = ({ address }) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const [isLoading, setLoading] = useState('');
  const [result, setResult] = useState<any>(null);
  // const [watches, setWatches] = useState<any>(null);
  const { data: balance } = useSWR([address, 'balanceOf', account]);
  const contract = new Contract(address, ERC721ABI, library?.getSigner());

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
  };

  const getWatch = async id => {
    const tokenId = await contract.tokenOfOwnerByIndex(account, id);
    const watchInfo = await contract.watches(tokenId);
    setResult(watchInfo);
  };

  const getTokenURI = async id => {
    const tokenId = await contract.tokenOfOwnerByIndex(account, id);
    console.log({ tokenId: tokenId.toNumber() });
    const uri = await contract.tokenURI(49 || tokenId.toNumber());
    console.log({ uri });
    setResult(uri);
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
          onClick={() => getWatch(balance - 1)}
        >
          Get Watch
        </Button>
        <Spacer width="0.6rem" />
        <Button
          loading={isLoading === 'listing'}
          onClick={() => getTokenURI(balance - 1)}
        >
          Get Token URI
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
        {/* <pre>{JSON.stringify(watches, null, 2)}</pre> */}
        {/* {result && parseFloat(formatUnits(result, 18)).toPrecision(4)} */}
      </div>
    </div>
  );
};

export default Actions;
