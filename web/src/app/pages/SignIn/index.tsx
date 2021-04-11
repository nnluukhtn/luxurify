import { PageContainer } from 'app/common/components';
import { BackgroundContainer } from 'app/common/styles';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useInjectSaga } from 'utils/redux-injectors';
import { signIn } from './actions';
import SignInForm from './components/SignInForm';
import signInSaga from './saga';
import Colors from 'app/common/Colors';

export function SignIn() {
  useInjectSaga({
    key: 'sign-in',
    saga: signInSaga,
  });
  const { search } = useLocation();
  const email = new URLSearchParams(search).get('email');

  return (
    <>
      <Helmet>
        <title>Sign In</title>
        <meta name="description" content="Luxurify - Sign In" />
      </Helmet>
      <BackgroundContainer>
        <PageContainer
          fluid
          innerStyle={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.N0_WHITE,
            maxWidth: 500,
            height: 430,
            marginTop: '4rem',
            borderRadius: 5,
          }}
        >
          <SignInForm email={email || ''} action={signIn} />
        </PageContainer>
      </BackgroundContainer>
    </>
  );
}
