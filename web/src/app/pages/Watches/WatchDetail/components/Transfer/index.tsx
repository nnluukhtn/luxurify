import Modal from 'antd/lib/modal/Modal';
import { Spacer, StyledButton } from 'app/common/styles';
import React, { useContext, useEffect, useState } from 'react';
import { seaportContext } from 'contexts/SeaportContext';
import { OpenSeaAsset } from 'opensea-js/lib/types';
import { TOKENS_BY_NETWORK } from 'app/common/components/TokenBalance/constants';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import useNotification from 'utils/hooks/NotificationHook/useNotification';
import styled from 'styled-components';
import InputForm from 'app/common/components/InputForm';
import { SwapOutlined } from '@ant-design/icons';
import ERC667ABI from 'app/abi/ERC667.abi.json';
import { Contract } from 'ethers';

interface Props {
  watchId: number;
  watchName: string;
}

const Transfer = ({ watchId, watchName }: Props) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const seaport = useContext(seaportContext);
  const [callSuccess, callError] = useNotification();
  const [showModal, setShowModal] = useState(false);
  const [targetAddress, setAddress] = useState('');
  const tokenAddress = TOKENS_BY_NETWORK[4][0].address;
  // console.log('transfer', { account, targetAddress });

  const transfer = async () => {
    console.log('run transfer', { account, targetAddress });
    if (account && targetAddress) {
      console.log(`transfering to ${targetAddress}...`);
      try {
        console.log({ watchId, tokenAddress, account });
        const listing = await seaport?.transfer({
          asset: {
            tokenId: watchId.toString(),
            tokenAddress,
          },
          fromAddress: account,
          toAddress: targetAddress,
          quantity: 1,
        });
        console.log({ listing });
        callSuccess(`Successfully transfer this item to ${targetAddress}.`);
      } catch (err) {
        callError('Error' + err.messgage);
      }
    } else {
      callError('Error: Can not get your account');
    }
  };

  const safeTransfer = async () => {
    console.log('run transfer', { account, targetAddress });
    if (account && library && targetAddress) {
      const contract = new Contract(
        tokenAddress,
        ERC667ABI,
        library?.getSigner(),
      );
      const transfer = await contract.safeTransferFrom(
        account,
        targetAddress,
        watchId,
      );
      const response = await transfer.wait();
      console.log(response);
    } else {
      callError('Error: Can not get your account or signer');
    }
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

  useEffect(() => {
    setAddress('');
  }, [showModal]);

  return (
    <div>
      <StyledButton onClick={() => setShowModal(true)}>
        <SwapOutlined style={{ position: 'relative', top: '-3px' }} />
        Transfer item
      </StyledButton>
      <Modal
        visible={showModal}
        title={<Header>Transfer Item</Header>}
        onCancel={() => setShowModal(false)}
        onOk={transfer}
        bodyStyle={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        closable={false}
      >
        <div>
          Are you sure to transfer this item:
          <br />
          <TextBold>{watchName}</TextBold>
          <br />
          to address:
          <br />
        </div>
        <Spacer height="0.6rem" />
        <InputForm
          onChange={e => setAddress(e.target.value)}
          value={targetAddress}
        />
      </Modal>
    </div>
  );
};

export default Transfer;

const TextBold = styled.span`
  font-weight: 600;
`;

const Header = styled.div`
  font-weight: 500;
  font-size: 1.1rem;
  text-align: center;
`;
