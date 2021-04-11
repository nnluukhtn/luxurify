/**
 *
 * RegisterWatch
 *
 */
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { PageContainer } from 'app/common/components';
import { TOKENS_BY_NETWORK } from 'app/common/components/TokenBalance/constants';
import { Container } from 'app/common/styles';
import { Contract, ethers } from 'ethers';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { registerWatchAdapter } from './adapter';
import ProgressModal from './components/ProgressModal';
import RegisterWatchForms from './components/RegisterWatchForms';
import { useRegisterWatchSlice } from './slice';
import {
  RegisterWatchParams,
  RegisterWatchResponse,
  RegisterWatchPayload,
} from './slice/types';
import ERC667ABI from '../../../abi/ERC667.abi.json';
import useNotification from 'utils/hooks/NotificationHook/useNotification';
import { useDispatch } from 'react-redux';
import { useFnDebounce } from 'utils/hooks/DebounceHooks';
import { useHistory } from 'react-router-dom';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

interface Props {}

export function RegisterWatch(_props: Props) {
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const dispatch = useDispatch();
  const debounceFn = useFnDebounce();
  const { actions } = useRegisterWatchSlice();
  const history = useHistory();
  const [callSuccess, callError] = useNotification();
  const [actionName, setActionName] = useState('');
  const [percent, setPercent] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | undefined>(
    undefined,
  );

  const claimWatch = async (values: RegisterWatchParams) => {
    const contract = new Contract(
      TOKENS_BY_NETWORK[chainId || 4]?.[0].address,
      ERC667ABI,
      library?.getSigner(),
    );
    setActionName(`Claiming watch...<wbr/>Please comfirm using Metamax.`);
    setShowProgress(true);
    setLoading(true);
    setTransactionHash('');
    setPercent(10);
    // console.log('FUNCTIONS', contract.functions);

    let claimWatch: any;
    try {
      claimWatch = await contract.functions.claimNewWatch(
        33,
        values.watchName,
        values.referenceNumber,
        values.priceType === 'FIXED' ? 1 : 0,
        values.priceUnit === 'ETH' ? 0 : 1,
        ethers.utils.parseEther(values.priceFixed.toString())._hex,
      );
    } catch (err) {
      callError('Error: ' + err);
      setActionName('Error while claiming watch');
      return;
    }

    setPercent(20);
    setActionName('Waiting for Confirmations...');

    try {
      await claimWatch.wait(console.log);
    } catch (err) {
      callError('Error: ' + err);
      setActionName('Error while waiting for confirmations');
      return;
    }

    setPercent(30);
    setActionName('Claimed watch.');
    setTransactionHash(claimWatch?.hash);
    debounceFn(submitWatch, 1500, values);
  };

  const submitWatch = (values: RegisterWatchParams) => {
    setPercent(50);
    setActionName('Registering your watch to our network...');
    const callback = (response: RegisterWatchResponse) => {
      if (response.success) {
        setPercent(60);
        setActionName('Successfully registered watch.');
        callSuccess('Successfully registered a watch');
        debounceFn(getToken, 1500, response.response.token_uri);
        // history.goBack();
      } else {
        setActionName('Error while registering your watch');
        callError(
          'There is an error while trying to register watch, ' +
            response?.error?.message,
        );
      }
    };
    const watchPayload: RegisterWatchPayload = registerWatchAdapter(values);
    dispatch(actions.registerWatch({ params: watchPayload, callback }));
  };

  const getToken = async (tokenUri: string) => {
    const contract = new Contract(
      TOKENS_BY_NETWORK[chainId || 4]?.[0].address,
      ERC667ABI,
      library?.getSigner(),
    );
    setPercent(70);
    setActionName('Getting watch token...');
    setActionName(`Let's wait for 30s, go get some coffee...`);

    await sleep(30000);
    setActionName('Checking for an updated Balance...');

    const balance = await contract.balanceOf(account);

    const token = await contract.tokenOfOwnerByIndex(account, balance - 1);

    setPercent(80);
    setActionName('Successfully get token');
    setURI(token.toNumber(), tokenUri);
  };

  const setURI = async (token: number, tokenUri: string) => {
    const newContract = new Contract(
      TOKENS_BY_NETWORK[chainId || 4]?.[0].address,
      ERC667ABI,
      library?.getSigner(),
    );
    setPercent(90);
    setActionName('Setting Token URI..., Please comfirm using Metamax.');

    const resp = await newContract.setTokenURI(token, tokenUri);
    setPercent(95);
    setActionName('Waiting for Confirmations...');

    const finalResp = await resp?.wait(console.log);
    setTransactionHash(finalResp?.transactionHash);
    setPercent(100);
    setLoading(false);
    setActionName('Finished!');
  };

  return (
    <>
      <Helmet>
        <title>Register Watch</title>
        <meta name="description" content="Luxurify - Register Watch" />
      </Helmet>

      <Container>
        <PageContainer
          fluid
          innerStyle={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <RegisterWatchForms onSubmit={claimWatch} />
        </PageContainer>
        <ProgressModal
          actionName={actionName}
          percent={percent}
          visible={showProgress}
          loading={isLoading}
          getContent={() =>
            transactionHash ? <p>hash: {transactionHash}</p> : null
          }
          closable={
            true ||
            actionName.indexOf('Error') >= 0 ||
            actionName.indexOf('Finish') >= 0
          }
          onClose={() => {
            if (actionName.indexOf('Finish') >= 0) history.push('/');
            setShowProgress(false);
          }}
        />
      </Container>
    </>
  );
}
