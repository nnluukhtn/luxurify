import Modal from 'antd/lib/modal/Modal';
import { Spacer, StyledButton } from 'app/common/styles';
import React, { useContext, useEffect, useState } from 'react';
import { seaportContext } from 'contexts/SeaportContext';
import { OpenSeaAsset } from 'opensea-js/lib/types';
import { TOKENS_BY_NETWORK } from 'app/common/components/TokenBalance/constants';
import useNotification from 'utils/hooks/NotificationHook/useNotification';
import { BigNumber } from 'ethers';
import { formatUnits } from '@ethersproject/units';
import styled from 'styled-components';
import { FormOutlined } from '@ant-design/icons';
import { PropagateLoader } from 'react-spinners';
import { Switch } from 'antd';
import InputForm from 'app/common/components/InputForm';

const overide = `
  display: block;
`;
interface Props {
  account: string;
  watchId: number;
  watchName: string;
  startAmount: string;
  onListed: () => void;
}

const CreateSellOrder = ({
  account,
  watchId,
  watchName,
  startAmount,
  onListed,
}: Props) => {
  const [callSuccess, callError] = useNotification();
  const [showModal, setShowModal] = useState(false);
  const seaport = useContext(seaportContext);
  const tokenAddress = TOKENS_BY_NETWORK[4][0].address;
  const [isListing, setListing] = useState(false);
  const [isPrivate, setPrivate] = useState(false);
  const [targetAddress, setTargetAddress] = useState('');

  const listingItem = async () => {
    console.log('run list', account);
    if (account) {
      console.log('listing...');
      try {
        console.log({ watchId, tokenAddress, account, startAmount });
        setListing(true);
        const listing = await seaport?.createSellOrder({
          asset: {
            tokenId: watchId.toString(),
            tokenAddress,
          },
          accountAddress: account,
          startAmount: formatUnits(BigNumber.from(startAmount), 18) as any,
          quantity: 1,
          expirationTime: 0,
        });
        console.log({ listing });
        if (listing?.asset) {
          callSuccess(
            `Successfully listed this item for sale at ${formatUnits(
              BigNumber.from(startAmount),
              18,
            )}.`,
          );
          setListing(false);
          setShowModal(false);
          onListed();
        }
      } catch (err) {
        callError('Error' + err);
      }
    }
  };

  const privateAuction = async () => {
    console.log('run list', account);
    if (account) {
      console.log('listing...');
      try {
        console.log({ watchId, tokenAddress, account, startAmount });
        setListing(true);
        const listing = await seaport?.createSellOrder({
          asset: {
            tokenId: watchId.toString(),
            tokenAddress,
          },
          accountAddress: account,
          startAmount: formatUnits(BigNumber.from(startAmount), 18) as any,
          quantity: 1,
          expirationTime: 0,
        });
        console.log({ listing });
        if (listing?.asset) {
          callSuccess(
            `Successfully listed this item for sale at ${formatUnits(
              BigNumber.from(startAmount),
              18,
            )}.`,
          );
          setListing(false);
          setShowModal(false);
          onListed();
        }
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
        onOk={isPrivate ? privateAuction : listingItem}
        bodyStyle={{ textAlign: 'center' }}
        closable={false}
        destroyOnClose
      >
        {isListing ? (
          <>Creating sell order for</>
        ) : (
          <>Are you sure to create a sell order for this item:</>
        )}
        <br />
        <TextBold>{watchName}</TextBold>
        <br />
        with the fixed price of{' '}
        <TextBold>{formatUnits(BigNumber.from(startAmount), 18)} ETH</TextBold>
        <br />
        <Switch onChange={() => setPrivate(true)} />
        {isPrivate ? (
          <InputForm
            label="to Address:"
            placeholder="Please enter"
            value={targetAddress}
            onChange={e => setTargetAddress(e.target.value)}
          />
        ) : null}
        {isListing && (
          <>
            <Spacer height="2rem" />
            <PropagateLoader size={15} color="#ffb82f" css={overide} />
          </>
        )}
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
