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
import { isInteger } from 'lodash';

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
  const [buyerAddress, setBuyerAddress] = useState('');

  const listingItem = async () => {
    console.log('run list', account, buyerAddress);
    if (account) {
      console.log('listing...');
      try {
        console.log({ watchId, tokenAddress, account, startAmount });
        setListing(true);
        let params: any = {
          asset: {
            tokenId: watchId.toString(),
            tokenAddress,
          },
          accountAddress: account,
          startAmount: formatUnits(BigNumber.from(startAmount), 18) as any,
          quantity: 1,
        };
        if (isPrivate && buyerAddress) {
          params = {
            ...params,
            buyerAddress,
            startAmount: BigNumber.from(startAmount),
          };
        } else {
          params = {
            ...params,
            expirationTime: 0,
          };
        }
        const listing = await seaport?.createSellOrder(params);
        console.log({ listing });
        if (listing?.asset) {
          callSuccess(
            `Successfully ${
              isPrivate
                ? 'create a private auction at'
                : 'listed this item for sale at'
            } ${formatUnits(BigNumber.from(startAmount), 18)}.`,
          );
          setListing(false);
          setShowModal(false);
          onListed();
        }
      } catch (err) {
        callError(err);
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

  useEffect(() => {
    if (!showModal) {
      setListing(false);
      if (isPrivate) setPrivate(false);
      setBuyerAddress('');
    }
  }, [showModal]);

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
        destroyOnClose
      >
        <div>
          {isListing ? (
            <>Creating sell order for</>
          ) : (
            <>Are you sure to create a sell order for this item:</>
          )}
          <br />
          <TextBold>{watchName}</TextBold>
          <br />
          with the fixed price of{' '}
          <TextBold>
            {formatUnits(BigNumber.from(startAmount), 18)} ETH
          </TextBold>
        </div>
        <Spacer height="1rem" />
        Is this a private auction:
        <br />
        <Spacer height="0.6rem" />
        <Switch onChange={() => setPrivate(prev => !prev)} />
        <Spacer height="1rem" />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {isPrivate ? (
            <InputForm
              label="Target address:"
              placeholder="Please enter"
              value={buyerAddress}
              onChange={e => setBuyerAddress(e.target.value)}
            />
          ) : null}
        </div>
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
