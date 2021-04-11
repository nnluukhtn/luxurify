import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import RegisterBrandForms from './components/RegisterBrandForms';
import { PageContainer } from 'app/common/components';
import { BackgroundContainer } from 'app/common/styles';
import Colors from 'app/common/Colors';

export function RegisterBrand() {
  return (
    <>
      <Helmet>
        <title>Register Brand</title>
        <meta name="description" content="Luxurify - Register Brand" />
      </Helmet>

      <BackgroundContainer>
        <PageContainer
          fluid
          innerStyle={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: Colors.N0_WHITE,
            maxWidth: 500,
            height: 520,
            marginTop: '3rem',
            borderRadius: 5,
          }}
        >
          <RegisterBrandForms />
        </PageContainer>
      </BackgroundContainer>
    </>
  );
}
