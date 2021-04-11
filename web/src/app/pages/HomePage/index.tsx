import * as React from 'react';
import Wallet from 'app/common/components/Wallet';
import { Helmet } from 'react-helmet-async';
import { BackgroundContainer, Header, StyledButton } from 'app/common/styles';
import { useHistory } from 'react-router-dom';
import { selectUser } from 'utils/SessionActions/SessionSelector';
import { useSelector } from 'react-redux';
import { PageContainer } from 'app/common/components';
import Colors from 'app/common/Colors';

export function HomePage() {
  const history = useHistory();
  const user = useSelector(selectUser);
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Luxurify - Homepage" />
      </Helmet>

      <BackgroundContainer>
        <PageContainer
          innerStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '3rem',
            paddingBottom: '5rem',
            backgroundColor: Colors.N0_WHITE,
            marginTop: '3rem',
            borderRadius: 5,
          }}
        >
          <Header
            style={{
              margin: '0.5rem 1rem',
              fontFamily: 'Cormorant Garamond',
              fontSize: 32,
            }}
          >
            Wallet
          </Header>
          {user?.isAdmin ? (
            <StyledButton
              type="link"
              danger
              onClick={() => history.push('/admin/brands')}
              style={{ marginBottom: '.2rem' }}
            >
              Pending Request Brands
            </StyledButton>
          ) : null}
          <Wallet />
        </PageContainer>
      </BackgroundContainer>
    </>
  );
}
