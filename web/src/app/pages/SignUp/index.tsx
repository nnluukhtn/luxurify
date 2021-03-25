import { PageContainer } from 'app/common/components';
import { Container } from 'app/common/styles';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import RegistrationForm from './components/RegistrationForm';

export function SignUp() {
  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Luxurify - Sign Up" />
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
          <RegistrationForm />
        </PageContainer>
      </Container>
    </>
  );
}
