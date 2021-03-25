import React from 'react';
import TokenBalance from '../TokenBalance';
import { TOKENS_BY_NETWORK } from '../TokenBalance/constants';

interface Props {
  chainId: number;
}

const TokenList = ({ chainId }: Props) => {
  return (
    <>
      {TOKENS_BY_NETWORK[chainId]?.map(token => (
        <TokenBalance key={token.address} {...token} />
      ))}
    </>
  );
};

export default TokenList;
