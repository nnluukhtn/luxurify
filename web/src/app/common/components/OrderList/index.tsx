import useSWR from 'swr';
import styled from 'styled-components';
import { OrderSide } from 'opensea-js/lib/types';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Card, Col, Row, Skeleton } from 'antd';
import { WatchVector } from 'app/common/assets';
import Colors from 'app/common/Colors';
import { Header, Spacer } from 'app/common/styles';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { seaportContext } from 'contexts/SeaportContext';
import { TOKENS_BY_NETWORK } from '../TokenBalance/constants';
import useNotification from 'utils/hooks/NotificationHook/useNotification';

const WatchList = ({ address }) => {
  const history = useHistory();
  const seaport = useContext(seaportContext);
  const [, callError] = useNotification();
  const { account } = useWeb3React<Web3Provider>();
  const [watches, setWatches] = useState<any>([]);
  const { data: balance } = useSWR([address, 'balanceOf', account]);
  const [isLoading, setIsLoading] = useState(false);

  const tokenAddress = TOKENS_BY_NETWORK[4][0].address;

  const getWatchList = async () => {
    setIsLoading(true);
    try {
      const { orders } = (await seaport?.api.getOrders({
        asset_contract_address: tokenAddress,
        side: OrderSide.Sell,
      })) || { orders: [], count: 0 };
      console.log({ orders });
      const watchList = orders.map(order => ({
        tokenURI: order.asset?.tokenAddress,
        id: order.asset?.tokenId,
        referenceNumber: order.asset?.tokenId,
        name:
          order.asset?.name ||
          order.asset?.description ||
          'Watch ID: ' + order.asset?.tokenId,
      }));

      setWatches(watchList);
      setIsLoading(false);
    } catch (err) {
      callError(err);
    }
  };

  useEffect(() => {
    getWatchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance, account, address, seaport?.api]);

  return (
    <WatchListContainer>
      <Header style={{ textAlign: 'center', fontSize: '1.5rem' }}>
        On sale watches
      </Header>
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
                    <Skeleton.Image
                      style={{ width: 150, height: 100, marginLeft: 10 }}
                    />
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
