import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Button, Row, Typography } from 'antd';
import { Spacer } from 'app/common/styles';
import { Contract } from 'ethers';
import React, { useState } from 'react';
import ERC667ABI from '../../../../abi/ERC667.abi.json';

const Actions = ({ address }) => {
  const { library } = useWeb3React<Web3Provider>();
  const [isLoading, setLoading] = useState('');
  const [result, setResult] = useState<any>(null);
  // const { data: balance, mutate } = useSWR([address, 'balanceOf', account]);
  // const { data: watches, mutate } = useSWR([address, 'watches']);

  const claimWatch = () => {
    const contract = new Contract(address, ERC667ABI, library?.getSigner());
    // setLoading('claiming');
    contract.functions
      .claimNewWatch(33, 'Rolex Datejust 116189PAVEL', '116189PAVEL')
      .then(value => {
        console.log(value);
        setResult(value);
        setLoading('');
      });
  };

  const list = () => {
    const contract = new Contract(address, ERC667ABI, library?.getSigner());
    console.log(contract.functions);
    contract.tokenByIndex(0).then(setResult);
    // setResult();
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
        {/* <pre>{JSON.stringify(watches, null, 2)}</pre> */}
        {/* {result && parseFloat(formatUnits(result, 18)).toPrecision(4)} */}
      </div>
    </div>
  );
};

export default Actions;
