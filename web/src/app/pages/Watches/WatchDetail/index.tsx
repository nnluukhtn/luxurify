/**
 *
 * WatchDetail
 *
 */
import { Col, Collapse, Image, Row, Skeleton } from 'antd';
import Colors from 'app/common/Colors';
import { PageContainer } from 'app/common/components';
import { Container, Header, Spacer } from 'app/common/styles';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { WatchDetailData } from './slice/types';
import QRCode from 'qrcode.react';
import ReactToPrint from 'react-to-print';
import QRCodePrint from './components/QRCodePrint';
import {
  LoadingOutlined,
  PrinterOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import { Contract } from '@ethersproject/contracts';
import { TOKENS_BY_NETWORK } from 'app/common/components/TokenBalance/constants';
import ERC667ABI from '../../../../abi/ERC667.abi.json';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import useNotification from 'utils/hooks/NotificationHook/useNotification';
import CreateSellOrder from './components/CreateSellOrder';
import { formatUnits } from '@ethersproject/units';

interface Props {}

export function WatchDetail(props: Props) {
  const { library } = useWeb3React<Web3Provider>();
  const { watchId } = useParams<{ watchId: string }>();
  const { search } = useLocation();
  const [, callError] = useNotification();
  const uri = new URLSearchParams(search).get('uri');
  const [detail, setDetail] = useState<WatchDetailData | null>(null);
  const qrRef = React.useRef<any | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [price, setPrice] = useState<any>({});

  // const transfer = async address => {
  //   const contract = new Contract(
  //     TOKENS_BY_NETWORK[4]?.[0].address,
  //     ERC667ABI,
  //     library?.getSigner(),
  //   );

  //   console.log({ functions: contract?.functions, library });
  //   const transfer = await contract?.ownerOf(3);
  //   console.log({ transfer });
  // };

  useEffect(() => {
    const fetchDetail = async (apiURL: string) => {
      const response = await fetch(
        `https://gateway.pinata.cloud/ipfs/${apiURL}`,
      );
      const json = await response.json();
      setDetail(json);
    };

    if (uri && !detail) {
      fetchDetail(uri);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri]);

  useEffect(() => {
    const getWatchFromChain = async watchId => {
      const contract = new Contract(
        TOKENS_BY_NETWORK[4]?.[0].address,
        ERC667ABI,
        library?.getSigner(),
      );
      if (contract && library) {
        let watchInfo: any;
        setLoading(true);
        try {
          watchInfo = await contract.getWatchInfo(+watchId);
        } catch (err) {
          callError('Error' + err);
        }
        console.log({ watchInfo });
        setPrice(watchInfo);
        setLoading(false);
      }
    };
    if (watchId) {
      console.log({ library });
      getWatchFromChain(watchId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchId]);

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
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
                    ) : price && price[6] ? (
                      `${formatUnits(price[6], 18)} ${
                        price[4] === 1 ? 'USD' : 'ETH'
                      }`
                    ) : (
                      '-'
                    )}
                  </Price>
                  <br />
                </Col>
              </Row>

              <Spacer height="0.6rem" />

              <Row style={{ paddingTop: '1rem' }}>
                {price && price[6] ? (
                  <CreateSellOrder
                    watchId={+watchId}
                    watchName={detail?.name || ''}
                    startAmount={price[6]?._hex || ''}
                  />
                ) : null}
              </Row>
              {/* <StyledButton
              onClick={() =>
                transfer('0xf57b2c51ded3a29e6891aba85459d600256cf317')
              }
            >
              Transfer
            </StyledButton> */}
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
                <StyledCollapse
                  defaultActiveKey={0}
                  ghost
                  expandIcon={props => (
                    <QrcodeOutlined
                      style={{ fontSize: 16 }}
                      rotate={props.isActive ? 180 : 0}
                    />
                  )}
                >
                  <Collapse.Panel
                    header={<MediumLabel>QR Code</MediumLabel>}
                    key="1"
                    // showArrow={false}
                  >
                    <ReactToPrint
                      documentTitle={`Luxurify_watch_${detail?.name || ''}`}
                      trigger={() => (
                        <StyledQRCode
                          className="watch_QRCode"
                          renderAs="canvas"
                          id={watchId}
                          value={JSON.stringify({ token: watchId, uri })}
                          size={180}
                          level={'L'}
                          includeMargin={false}
                        />
                      )}
                      content={() => qrRef.current}
                    />
                    <PrintText>
                      <PrinterOutlined
                        style={{
                          fontSize: 16,
                          marginRight: '0.6rem',
                        }}
                      />
                      Click on the code to print
                    </PrintText>
                  </Collapse.Panel>
                </StyledCollapse>
              </Row>
            </Col>
          </Row>
        </DetailContainer>
      </PageContainer>
      <InvisibleContainer>
        <QRCodePrint
          ref={qrRef}
          watchName={detail?.name || ''}
          watchId={+watchId || 0}
          watchImage={detail?.image}
          uri={uri || ''}
        />
      </InvisibleContainer>
    </Container>
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

export const InvisibleContainer = styled.div`
  display: none;
`;

export const StyledQRCode = styled(QRCode)`
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.32);
  }
`;

export const PrintText = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledCollapse = styled(Collapse)`
  &.ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header
    .ant-collapse-arrow {
    left: 1px !important;
  }
  .ant-collapse-header {
    padding-left: 1.7rem !important;
  }
`;

export const DetailContainer = styled.div`
  margin: 2rem auto;
  width: 800px;
  height: 100%;
  overflow: hidden;
`;
