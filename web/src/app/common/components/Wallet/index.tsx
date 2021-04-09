import React, { useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { injectedConnector } from 'index';
import EthBalance from '../EthBalance';
import TokenList from '../TokenList';
import { SWRConfig } from 'swr';
import fetcher from 'utils/fetcher';
// import ERC20ABI from '../../../../abi/ERC20.abi.json';
import ERC667ABI from '../../../../abi/ERC667.abi.json';
import Balance from '../Balance';
import styled from 'styled-components';
import { Networks } from '../../../../constants';
import { Button } from 'antd.macro';
import { TOKENS_BY_NETWORK } from '../TokenBalance/constants';
import Actions from '../Actions';
import WatchList from '../WatchList';

// import { EtherView } from '../EtherView';

const Wallet = () => {
  const {
    chainId,
    account,
    activate,
    deactivate,
    active,
    library,
  } = useWeb3React<Web3Provider>();

  const handleActivate = (e: React.MouseEvent) => {
    e.preventDefault();
    activate(injectedConnector);
  };

  const handleDeactivate = (e: React.MouseEvent) => {
    e.preventDefault();
    deactivate();
  };

  useEffect(() => {
    if (!active) activate(injectedConnector);
    return () => {
      if (active) deactivate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ margin: '16px 32px' }}>
      {active ? (
        <div style={{ marginBottom: '2rem' }}>
          ✅
          <ConnectedLabel>
            Connected with Metamax
            <Button type="primary" danger onClick={handleDeactivate}>
              Disconnect
            </Button>
          </ConnectedLabel>
        </div>
      ) : (
        <Button
          type="primary"
          onClick={handleActivate}
          style={{ marginBottom: '2rem' }}
        >
          Connect with Metamax
        </Button>
      )}

      <p>
        <strong>ChainId: </strong>
        {chainId
          ? `${chainId}${` (${Object.keys(Networks).find(
              name => Networks[name] === chainId,
            )})`}`
          : '-'}
      </p>
      <p>
        <strong>Account: </strong> {account || '-'}
      </p>

      <SWRConfig value={{ fetcher: fetcher(library, ERC667ABI) }}>
        {/* <EtherView /> */}
        <div style={{ width: 'min-content', margin: '0 auto' }}>
          <Balance>
            <EthBalance />
            {chainId !== undefined && <TokenList chainId={chainId} />}
          </Balance>
        </div>
        {chainId !== undefined &&
          TOKENS_BY_NETWORK[chainId]?.map(token => (
            <Actions key={token.address} {...token} />
          ))}
        <WatchList {...TOKENS_BY_NETWORK[4][0]} />
      </SWRConfig>
    </div>
  );
};

export default Wallet;

const ConnectedLabel = styled.em`
  display: inline-block;
  cursor: pointer;
  margin-left: 1rem;
  button {
    opacity: 0;
    margin-left: 0.5rem;
    transform: translateX(-0.5rem);
  }
  &:hover {
    button {
      opacity: 1;
      transform: translateX(0.5rem);
    }
  }
`;
