/**
 *
 * RegisterWatch
 *
 */
import { PageContainer } from 'app/common/components';
import { Container } from 'app/common/styles';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import RegisterWatchForms from './components/RegisterWatchForms';

interface Props {}

export function RegisterWatch(_props: Props) {
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
          <RegisterWatchForms />
        </PageContainer>
      </Container>
    </>
  );
}
