import { PageContainer } from 'app/common/components';
import { Container } from 'app/common/styles';
import SignInForm from 'app/pages/SignIn/components/SignInForm';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useInjectSaga } from 'utils/redux-injectors';
import { adminSignIn } from './actions';
import adminSignInSaga from './saga';

export function AdminSignIn() {
  useInjectSaga({
    key: 'sign-in',
    saga: adminSignInSaga,
  });
  const { search } = useLocation();
  const email = new URLSearchParams(search).get('email');

  return (
    <>
      <Helmet>
        <title>Admin Sign In</title>
        <meta name="description" content="Luxurify - Admin Sign In" />
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
          <SignInForm email={email || ''} action={adminSignIn} isAdmin />
        </PageContainer>
      </Container>
    </>
  );
}
