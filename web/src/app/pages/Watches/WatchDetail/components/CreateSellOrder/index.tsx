import Modal from 'antd/lib/modal/Modal';
import { StyledButton } from 'app/common/styles';
import React, { useContext, useEffect, useState } from 'react';
import { seaportContext } from 'contexts/SeaportContext';
import { OpenSeaAsset } from 'opensea-js/lib/types';
import { TOKENS_BY_NETWORK } from 'app/common/components/TokenBalance/constants';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import useNotification from 'utils/hooks/NotificationHook/useNotification';
import { BigNumber } from 'ethers';
import { formatUnits } from '@ethersproject/units';
import styled from 'styled-components';
import { FormOutlined } from '@ant-design/icons';

interface Props {
  account: string;
  watchId: number;
  watchName: string;
  startAmount: string;
}

const CreateSellOrder = ({
  account,
  watchId,
  watchName,
  startAmount,
}: Props) => {
  const [callSuccess, callError] = useNotification();
  const [showModal, setShowModal] = useState(false);
  const seaport = useContext(seaportContext);
  const tokenAddress = TOKENS_BY_NETWORK[4][0].address;

  const listingItem = async () => {
    console.log('run list', account);
    if (account) {
      console.log('listing...');
      try {
        console.log({ watchId, tokenAddress, account, startAmount });
        const listing = await seaport?.createSellOrder({
          asset: {
            tokenId: watchId.toString(),
            tokenAddress,
          },
          accountAddress: account,
          startAmount: startAmount as any,
          quantity: 1,
          expirationTime: 0,
        });
        console.log({ listing });
        callSuccess(
          `Successfully listed this item for sale at ${startAmount}.`,
        );
      } catch (err) {
        callError('Error' + err);
      }
    }
  };

  useEffect(() => {
    const fetchAssets = async () => {
      const asset: OpenSeaAsset | undefined = await seaport?.api.getAsset({
        tokenAddress: TOKENS_BY_NETWORK[4][0].address,
        tokenId: watchId,
      });
      console.log({ asset });
    };

    if (seaport && watchId) fetchAssets();
  }, [seaport, watchId]);

  return (
    <div>
      <StyledButton type="primary" onClick={() => setShowModal(true)}>
        <FormOutlined style={{ position: 'relative', top: '-3px' }} />
        Create sell order
      </StyledButton>
      <Modal
        visible={showModal}
        title={<Header>Create sell order</Header>}
        onCancel={() => setShowModal(false)}
        onOk={listingItem}
        bodyStyle={{ textAlign: 'center' }}
        closable={false}
      >
        Are you sure to create a sell order for this item:
        <br />
        <TextBold>{watchName}</TextBold>
        <br />
        with the fixed price of{' '}
        <TextBold>
          {formatUnits(BigNumber.from(startAmount), 18)} ETH
        </TextBold>{' '}
        ?
      </Modal>
    </div>
  );
};

export default CreateSellOrder;

const TextBold = styled.span`
  font-weight: 600;
`;

const Header = styled.div`
  font-weight: 500;
  font-size: 1.1rem;
  text-align: center;
`;
