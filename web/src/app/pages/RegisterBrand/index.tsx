import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import RegisterBrandForms from './components/RegisterBrandForms';
import { PageContainer } from 'app/common/components';
import { Container } from 'app/common/styles';

export function RegisterBrand() {
  return (
    <>
      <Helmet>
        <title>Register Brand</title>
        <meta name="description" content="Luxurify - Register Brand" />
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
          <RegisterBrandForms />
        </PageContainer>
      </Container>
    </>
  );
}
