/**
 *
 * WatchDetail
 *
 */
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Button, Col, Image, Row, Typography } from 'antd';
import Colors from 'app/common/Colors';
import { PageContainer } from 'app/common/components';
import { TOKENS_BY_NETWORK } from 'app/common/components/TokenBalance/constants';
import { Container } from 'app/common/styles';
import { Contract } from 'ethers';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import ERC667ABI from '../../../../abi/ERC667.abi.json';
import { detailAdapter } from './adapter';
import { WatchDetailData } from './slice/types';

interface Props {}

export function WatchDetail(props: Props) {
  const { account, library } = useWeb3React<Web3Provider>();
  const { watchId } = useParams<{ watchId: string }>();
  const [detail, setDetail] = useState<WatchDetailData | null>(null);
  const fetchDetail = async (apiURL: string) => {
    const response = await fetch(`https://gateway.pinata.cloud/ipfs/${apiURL}`);
    const json = await response.json();
    setDetail(json);
  };

  // const getURI = async (id: number) => {
  //   const contract = new Contract(
  //     TOKENS_BY_NETWORK[4]?.[0].address,
  //     ERC667ABI,
  //     library?.getSigner(),
  //   );
  //   console.log({ contract }, library?.getSigner(), contract.functions, id);
  //   const tokenURI = await contract?.tokenURI(id);
  //   const data = await fetchDetail(tokenURI);
  //   console.log({ data });
  //   setDetail(detailAdapter(data));
  // };
  // useEffect(() => {
  //   const fetchDetail = async (apiURL: string) => {
  //     const response = await fetch(apiURL);
  //     const json = await response.json();
  //     return json;
  //   };

  //   const getURI = async (id: number) => {
  //     const contract = new Contract(
  //       TOKENS_BY_NETWORK[4]?.[0].address,
  //       ERC667ABI,
  //       library?.getSigner(),
  //     );
  //     console.log({ contract }, contract.functions, id);
  //     const tokenURI = await contract.tokenURI(id);
  //     const data = await fetchDetail(tokenURI);
  //     console.log({ data });
  //     setDetail(detailAdapter(data));
  //   };

  //   if (watchId) {
  //     // getURI(+watchId);
  //     fetchDetail(watchId)
  //   }
  // }, [watchId]);

  useEffect(() => {
    console.log(account);
    console.log(library, library?.getSigner());
  }, [library]);

  if (!detail) {
    return (
      <div>
        Loading...
        <Button onClick={() => fetchDetail(watchId)}>Get Detail</Button>
      </div>
    );
  }

  return (
    <Container>
      <PageContainer innerStyle={{ paddingBottom: '5rem' }}>
        <SmallHeader>Watch Detail</SmallHeader>
        {detail.name && (
          <Typography.Title level={4}>{detail.name}</Typography.Title>
        )}
        <Row>
          <Col span={10}>
            {detail.image && (
              <ImageContainer>
                <Image src={detail.image} preview />
              </ImageContainer>
            )}
          </Col>
          <Col span={14}>
            <ul>
              {detail && detail.attributes?.length
                ? detail.attributes.map((item, idx) => (
                    <li key={`watchDetail_${idx}`}>
                      <Label>{item.trait_type}:</Label> {item.value}
                    </li>
                  ))
                : null}
            </ul>
          </Col>
        </Row>
        {/* QRCode */}
      </PageContainer>
    </Container>
  );
}

const ImageContainer = styled.div`
  width: 480px;
  object-fit: cover;
`;

const Label = styled.span`
  font-weight: 500;
  color: ${Colors.N500_GREY};
`;

const SmallHeader = styled.span`
  font-weight: 500;
  font-size: 1rem;
`;
