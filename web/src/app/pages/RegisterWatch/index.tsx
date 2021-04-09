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
import { BigNumber, Contract } from 'ethers';
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

interface Props {}

export function RegisterWatch(_props: Props) {
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const dispatch = useDispatch();
  const debounceFn = useFnDebounce();
  const { actions } = useRegisterWatchSlice();
  // const history = useHistory();
  const [callSuccess, callError] = useNotification();
  const [actionName, setActionName] = useState('');
  const [percent, setPercent] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | undefined>(
    undefined,
  );
  const claimWatch = async (values: RegisterWatchParams) => {
    const contract = new Contract(
      TOKENS_BY_NETWORK[chainId || 4]?.[0].address,
      ERC667ABI,
      library?.getSigner(),
    );
    console.log('Signer', library, library?.getSigner());
    setActionName('Claiming watch...');
    setShowProgress(true);
    setPercent(10);

    let claimWatch: any;
    try {
      claimWatch = await contract.functions.claimNewWatch(
        33,
        values.watchName,
        values.referenceNumber,
      );
    } catch (err) {
      callError('Error: ' + err);
      setActionName('Error while claiming watch');
      return;
    }

    setPercent(20);
    setActionName('Waiting for Confirmation...');
    console.log('CLAIMING: ', claimWatch);

    let confirmResp: any;
    try {
      confirmResp = await claimWatch.wait(console.log);
    } catch (err) {
      callError('Error: ' + err);
      setActionName('Error while waiting for confirmations');
      return;
    }

    setPercent(30);
    setActionName('Claimed watch.');
    console.log('CONFIRMED: ', confirmResp, confirmResp?.logs);
    setTransactionHash(claimWatch?.hash);
    debounceFn(submitWatch, 1500, values);
  };

  const submitWatch = (values: RegisterWatchParams) => {
    console.log('start registering with: ', values);
    setPercent(50);
    setActionName('Register your watch to our network...');
    const callback = (response: RegisterWatchResponse) => {
      if (response.success) {
        setPercent(60);
        setActionName('Successfully registered watch.');
        callSuccess('Successfully registered a watch');
        console.log('SUCCESS register: ', response);
        debounceFn(
          getToken,
          1500,
          response.response.token_uri + transactionHash,
        );
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
    console.log('watchPayload', watchPayload);
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
    console.log('Getting watch token...', tokenUri);
    const token = await contract.tokenOfOwnerByIndex(account, 4);
    setPercent(80);
    setActionName('Successfully get token');
    console.log('Get Token: ', token);
    debounceFn(setURI, 1500, [token, tokenUri]);
  };

  const setURI = async (token: number, tokenUri: string) => {
    const newContract = new Contract(
      TOKENS_BY_NETWORK[chainId || 4]?.[0].address,
      ERC667ABI,
      library?.getSigner(),
    );
    setPercent(90);
    setActionName('Setting Token URI...');
    console.log('Setting URI,', token, tokenUri);
    const resp = await newContract.setTokenURI(
      BigNumber.from(token).toNumber(),
      tokenUri,
    );
    setPercent(100);
    setActionName('Successfully setting Token URI!');
    console.log('setURI Resp: ', resp);
    const finalResp = await resp?.wait(console.log);
    console.log('FINAL:', finalResp);
  };

  // useEffect(() => {
  //   setURI(
  //     BigNumber.from('0x15').toNumber(),
  //     'https://gateway.pinata.cloud/ipfs/0x4139c57f3e0f381af18f4d80df910ce857e1fec6194f2b60a7a17e91466fb3a2',
  //   );
  // }, []);

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
          closable={actionName.indexOf('Error') >= 0}
          onClose={() => setShowProgress(false)}
        />
      </Container>
    </>
  );
}
