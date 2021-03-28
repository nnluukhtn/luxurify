import { PageContainer } from 'app/common/components';
import { Container } from 'app/common/styles';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useInjectSaga } from 'utils/redux-injectors';
import { signIn } from './actions';
import SignInForm from './components/SignInForm';
import signInSaga from './saga';

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
      <Container>
        <PageContainer
          fluid
          innerStyle={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <SignInForm email={email || ''} action={signIn} />
        </PageContainer>
      </Container>
    </>
  );
}
