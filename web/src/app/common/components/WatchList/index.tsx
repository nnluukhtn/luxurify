import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Button, Card, Col, Row, Skeleton, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Contract, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useSWR from 'swr';
import ERC667ABI from '../../../../abi/ERC667.abi.json';

const getEmptyObjectList = (length: number) => {
  return Array(length).fill({});
};

const WatchList = ({ address }) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const history = useHistory();
  const [watches, setWatches] = useState<any>(getEmptyObjectList(14));
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
        const tokenURI = await contract.getTokenURI(token);
        const tokenBreakdown = tokenURI?.split('/');
        const watchData = {
          tokenURI: tokenBreakdown[tokenBreakdown.length - 1],
          id: token,
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

  // useEffect(() => {
  //   const getToken = async () => {
  //     const result = await contract.tokenOfOwnerByIndex(account, 7);
  //     const watch = await contract.getWatchInfo(result);
  //   };
  //   getToken();
  // }, []);

  return (
    <div
      style={{
        borderRadius: '10px',
        minHeight: 50,
        minWidth: 280,
        width: 'auto',
        padding: '1rem',
        overflow: 'scroll',
        margin: '2rem auto',
      }}
    >
      <Typography.Title level={4}>
        Owner's watch list{' '}
        <Typography.Text style={{ fontSize: '1rem', fontWeight: 600 }}>
          (Total: {balance && balance.toString()})
        </Typography.Text>
      </Typography.Title>
      {isLoading && !watches ? (
        <>Getting list...</>
      ) : Array.isArray(watches) ? (
        <StyledRow gutter={[16, 16]} justify="center" align="top">
          {watches.map((value, idx) => (
            <Col key={`watch_${idx}_${value.id}`}>
              <Card
                hoverable
                style={{ width: 150, height: 240, textAlign: 'center' }}
                loading={!value.name}
                onClick={() =>
                  value.tokenURI &&
                  history.push(`/watches/${value.id}?uri=${value.tokenURI}`)
                }
                cover={
                  !value.name ? (
                    <Skeleton.Image />
                  ) : (
                    <img
                      alt="example"
                      style={{
                        maxWidth: 145,
                        maxHeight: 100,
                        objectFit: 'contain',
                        marginLeft: 2,
                        marginTop: 2,
                      }}
                      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fst3.depositphotos.com%2F2060785%2F17020%2Fv%2F450%2Fdepositphotos_170205484-stock-illustration-icon-wristwatch-vector.jpg&f=1&nofb=1"
                    />
                  )
                }
              >
                <span style={{ fontSize: 12, fontWeight: 600 }}>
                  {value.name}
                </span>
                <br />
                {value.referenceNumber}
                {value.tokenURI && (
                  <Button type="link" style={{ fontSize: 12 }}>
                    see detail
                  </Button>
                )}
              </Card>
            </Col>
          ))}
        </StyledRow>
      ) : (
        'None'
      )}
    </div>
  );
};

export default WatchList;

const StyledRow = styled(Row)`
  /* :nth-child() {
    margin: 0.5rem;
  } */
`;
