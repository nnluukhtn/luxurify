import Colors from 'app/common/Colors';
import { PageContainer } from 'app/common/components';
import { BackgroundContainer } from 'app/common/styles';
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
          <RegistrationForm />
        </PageContainer>
      </BackgroundContainer>
    </>
  );
}
