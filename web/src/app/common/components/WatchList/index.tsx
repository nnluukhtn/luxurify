import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Card, Col, Row, Skeleton } from 'antd';
import { WatchVector } from 'app/common/assets';
import Colors from 'app/common/Colors';
import { Header, Spacer } from 'app/common/styles';
import { Contract } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useSWR from 'swr';
import ERC667ABI from 'app/abi/ERC667.abi.json';

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

  useEffect(() => {
    // const getToken = async () => {
    //   const result = await contract.tokenOfOwnerByIndex(account, 7);
    //   const watch = await contract.getWatchInfo(result);
    // };
    // getToken();
    return () => {
      setWatches(getEmptyObjectList(14));
    };
  }, []);

  return (
    <WatchListContainer>
      <Header style={{ textAlign: 'center', fontSize: '1.5rem' }}>
        Owner's claimed watches
      </Header>
      <div style={{ fontSize: '0.9rem', textAlign: 'center' }}>
        ( Total: {balance && balance.toString()} )
      </div>
      <Spacer height="2rem" />

      {isLoading && !watches ? (
        <>Getting list...</>
      ) : Array.isArray(watches) ? (
        <StyledRow gutter={[16, 16]} justify="center" align="top">
          {watches.map((value, idx) => (
            <Col key={`watch_${idx}_${value.id}`}>
              <Card
                hoverable
                style={{ width: 170, height: 260, position: 'relative' }}
                bodyStyle={{ textAlign: 'center' }}
                loading={!value.name}
                onClick={() =>
                  value.tokenURI &&
                  history.push(`/watches/${value.id}?uri=${value.tokenURI}`)
                }
                cover={
                  !value.name ? (
                    <Skeleton.Image style={{ width: 150, height: 100 }} />
                  ) : (
                    <img
                      alt="example"
                      style={{
                        maxWidth: 90,
                        maxHeight: 100,
                        objectFit: 'contain',
                        margin: 'auto',
                        marginTop: '8px',
                      }}
                      src={WatchVector}
                    />
                  )
                }
              >
                <p style={{ fontSize: 12, fontWeight: 600 }}>{value.name}</p>
                {value.tokenURI && (
                  <div
                    style={{
                      color: Colors.B300_BLUE,
                      position: 'absolute',
                      left: 0,
                      bottom: '8px',
                      textAlign: 'center',
                      width: '100%',
                    }}
                  >
                    see details
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </StyledRow>
      ) : (
        'None'
      )}
    </WatchListContainer>
  );
};

export default WatchList;

const StyledRow = styled(Row)`
  /* :nth-child() {
    margin: 0.5rem;
  } */
`;

const WatchListContainer = styled.div`
  border-radius: 10px;
  min-height: 50;
  min-width: 280;
  width: auto;
  padding: 1rem;
  padding-top: 0;
  overflow: hidden;
  margin: 0.5rem auto 2rem auto;
`;
