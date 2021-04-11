/**
 *
 * WatchDetail
 *
 */
import { Col, Image, Row, Skeleton } from 'antd';
import Colors from 'app/common/Colors';
import { PageContainer } from 'app/common/components';
import { Container, Header, Spacer } from 'app/common/styles';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { WatchDetailData } from './slice/types';
import { LoadingOutlined } from '@ant-design/icons';
import { Contract } from '@ethersproject/contracts';
import { TOKENS_BY_NETWORK } from 'app/common/components/TokenBalance/constants';
import useNotification from 'utils/hooks/NotificationHook/useNotification';
import ERC721ABI from 'app/abi/ERC721.abi.json';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import CreateSellOrder from './components/CreateSellOrder';
import { formatUnits } from '@ethersproject/units';
import Transfer from './components/Transfer';
import { getLibrary } from 'index';
import { Helmet } from 'react-helmet-async';
import WatchQR from './components/WatchQR';
import { seaportContext } from 'contexts/SeaportContext';
import { OpenSeaAsset } from 'opensea-js/lib/types';
import Buy from './components/Buy';

interface Props {}

export function WatchDetail(props: Props) {
  const library = getLibrary();
  const { account } = useWeb3React<Web3Provider>();
  const seaport = React.useContext(seaportContext);
  const { watchId } = useParams<{ watchId: string }>();
  const [uri, setUri] = useState('');
  const history = useHistory();
  const [, callError] = useNotification();
  const [detail, setDetail] = useState<WatchDetailData | null>(null);
  const [price, setPrice] = useState<any>({});
  const [isLoading, setLoading] = useState(false);
  const [isSelling, setIsSelling] = useState(false);
  const [isOwner, setisOwner] = useState(false);
  const tokenAddress = TOKENS_BY_NETWORK[4][0].address;
  const contract = new Contract(tokenAddress, ERC721ABI, library?.getSigner());

  // Event handlers

  const fetchAssets = async () => {
    const asset: OpenSeaAsset | undefined = await seaport?.api.getAsset({
      tokenAddress,
      tokenId: watchId,
    });
    console.log({ asset });
    const sellOrder = asset?.sellOrders?.find(
      order => order.target === asset.tokenAddress,
    );
    setIsSelling(sellOrder !== undefined);
    // if (sellOrder !== undefined)
    // console.log(formatUnits(sellOrder!.currentPrice!, 18));
  };

  const onActionSucceed = () => {
    history.push('/');
  };

  const getWatchFromChain = async watchId => {
    if (contract && library) {
      let watchInfo: any;
      setLoading(true);
      try {
        watchInfo = await contract.getWatchInfo(+watchId);
        const ownerAddress = await contract.functions.ownerOf(+watchId);
        setisOwner(ownerAddress?.[0] === account);
      } catch (err) {
        callError('Error' + err);
      }
      console.log({ watchInfo });
      setPrice(watchInfo);
      setLoading(false);
    }
  };

  const fetchDetail = async () => {
    const url = await contract.functions.getTokenURI(watchId);
    // const smth = await contract.functions.getEthUsdPrice();
    // console.log({ smth });
    setUri(url[0]);
    const response = await fetch(url[0]);
    console.log(response.body);
    const json = await response.json();
    setDetail(json);
  };

  // Side-Effects

  useEffect(() => {
    if (!detail) {
      fetchDetail();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (watchId) {
      getWatchFromChain(watchId);
    }
    return () => {
      setisOwner(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchId]);

  useEffect(() => {
    if (seaport && watchId) fetchAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seaport, watchId]);

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Watch Detail</title>
        <meta name="description" content="Luxurify - Watch Detail" />
      </Helmet>

      <Container>
        <PageContainer
          innerStyle={{
            paddingBottom: '5rem',
          }}
        >
          <DetailContainer>
            <SmallHeader>Watch Info</SmallHeader>
            {detail.name && <Header>{detail.name}</Header>}
            <Row style={{ marginTop: '1rem' }}>
              <Col span={12}>
                <ImageContainer>
                  {detail.image ? (
                    <Image
                      src={detail.image}
                      preview
                      style={{
                        width: 400,
                        height: 400,
                        objectFit: 'contain',
                        border: '1px solid lightgray',
                        borderRadius: 5,
                      }}
                      placeholder={
                        <Skeleton.Image style={{ height: 400, width: 400 }} />
                      }
                    />
                  ) : (
                    <Skeleton.Image
                      style={{
                        width: 400,
                        height: 400,
                      }}
                    />
                  )}
                </ImageContainer>

                <Spacer height="1.6rem" />

                <Row>
                  <Col span={4}>
                    <MediumLabel>Price: </MediumLabel>
                  </Col>
                  <Col>
                    <Price>
                      {isLoading ? (
                        <LoadingOutlined />
                      ) : price && price[7] ? (
                        `${formatUnits(price[7], 18)} ETH`
                      ) : (
                        '-'
                      )}
                      {isSelling && (
                        <Label
                          style={{
                            marginLeft: '1rem',
                            color: Colors.G500_GREEN,
                          }}
                        >
                          ON SALE
                        </Label>
                      )}
                    </Price>
                    <br />
                  </Col>
                </Row>

                <Spacer height="0.6rem" />

                {isOwner ? (
                  <>
                    <Label>Owned by you</Label>
                    <Row style={{ paddingTop: '1rem' }}>
                      {price && price[7] && account && !isSelling ? (
                        <>
                          {console.log({ price })}
                          {console.log({
                            priceType: price[3],
                            priceUnit: price[4],
                            priceFixed: formatUnits(price[5], 18),
                            priceDynamic: formatUnits(price[6], 18),
                            priceTobesold: price[7],
                          })}
                          <CreateSellOrder
                            account={account}
                            watchId={+watchId}
                            watchName={detail?.name || ''}
                            startAmount={price[7]?._hex || ''}
                            onListed={onActionSucceed}
                          />
                        </>
                      ) : null}
                    </Row>
                    <Row style={{ paddingTop: '1rem' }}>
                      {price && price[7] && !isSelling ? (
                        <Transfer
                          // account={account}
                          watchId={+watchId}
                          watchName={detail?.name || ''}
                        />
                      ) : null}
                    </Row>
                  </>
                ) : (
                  <>
                    <Row style={{ paddingTop: '1rem' }}>
                      {price && price[7] && isSelling ? (
                        <Buy
                          // account={account}
                          callback={() => {
                            fetchDetail();
                            getWatchFromChain(watchId);
                            fetchAssets();
                          }}
                          watchId={+watchId}
                          watchName={detail?.name || ''}
                        />
                      ) : null}
                    </Row>
                  </>
                )}
              </Col>

              <Col span={12} style={{ paddingLeft: '0.5rem' }}>
                <Row style={{ height: 415 }}>
                  <ul>
                    {detail && detail.attributes?.length
                      ? detail.attributes.map((item, idx) => (
                          <li
                            key={`watchDetail_${idx}`}
                            style={{ marginBottom: '0.4rem' }}
                          >
                            <Label>{item.trait_type}:</Label> {item.value}
                          </li>
                        ))
                      : null}
                  </ul>
                </Row>
                <Row style={{ paddingLeft: '2rem' }}>
                  {detail && (
                    <WatchQR
                      watchName={detail?.name}
                      id={watchId}
                      uri={uri}
                      image={detail?.image}
                    />
                  )}
                </Row>
              </Col>
            </Row>
          </DetailContainer>
        </PageContainer>
      </Container>
    </>
  );
}

const ImageContainer = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.span`
  font-weight: 500;
  color: ${Colors.N500_GREY};
  margin-right: 0.5rem;
`;

const SmallHeader = styled.span`
  font-weight: 500;
  font-size: 1rem;
`;

const MediumLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;

const Price = styled.span`
  font-size: 1.1rem;
  font-weight: 400;
  margin-left: 1rem;
`;

export const DetailContainer = styled.div`
  margin: 2rem auto;
  width: 800px;
  height: 100%;
  overflow: hidden;
`;
