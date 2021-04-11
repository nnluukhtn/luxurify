import Modal from 'antd/lib/modal/Modal';
import { StyledButton } from 'app/common/styles';
import React, { useContext, useEffect, useState } from 'react';
import { seaportContext } from 'contexts/SeaportContext';
import { OpenSeaAsset } from 'opensea-js/lib/types';
import { TOKENS_BY_NETWORK } from 'app/common/components/TokenBalance/constants';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import useNotification from 'utils/hooks/NotificationHook/useNotification';
import styled from 'styled-components';
import { setTimeout } from 'timers';

interface Props {
  watchId: number;
  watchName: string;
  callback: () => void;
}

const Transfer = ({ callback, watchId, watchName }: Props) => {
  const {
    account,
    // library,
  } = useWeb3React<Web3Provider>();
  const seaport = useContext(seaportContext);
  const [callSuccess, callError] = useNotification();
  const [calling, setCalling] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const tokenAddress = TOKENS_BY_NETWORK[4][0].address;

  const magicAwaking = async (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

  const transfer = async () => {
    setCalling(true);
    console.log('run buy', { account });
    if (account) {
      try {
        const order = await seaport?.api.getOrder({ token_id: watchId });
        if (!order) throw new Error('Cannot get this error');
        await seaport?.fulfillOrder({
          order,
          accountAddress: account,
        });
        await magicAwaking(15000);
        callSuccess(`Successfully buying this item.`);
      } catch (err) {
        callError(err);
      }
      setShowModal(false);
      setCalling(false);
      callback();
    } else {
      callError('Error: Can not get your account');
    }
    setCalling(false);
  };

  useEffect(() => {
    const fetchAssets = async () => {
      const asset: OpenSeaAsset | undefined = await seaport?.api.getAsset({
        tokenAddress,
        tokenId: watchId,
      });
      console.log(
        { asset },
        'isSelling: ',
        asset?.sellOrders?.find(
          order => order.target === asset.tokenAddress,
        ) !== undefined,
      );
    };

    if (seaport && watchId) fetchAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seaport, watchId]);

  return (
    <div>
      <StyledButton type="primary" onClick={() => setShowModal(true)}>
        Buy now
      </StyledButton>
      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        confirmLoading={calling}
        onOk={transfer}
        okText="Make it mine!"
        bodyStyle={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        closable={false}
      >
        <div>
          Are you sure you want to buy this item:
          <br />
          <TextBold>{watchName}</TextBold>
        </div>
      </Modal>
    </div>
  );
};

export default Transfer;

const TextBold = styled.span`
  font-weight: 600;
`;

// const Header = styled.div`
//   font-weight: 500;
//   font-size: 1.1rem;
//   text-align: center;
// `;
