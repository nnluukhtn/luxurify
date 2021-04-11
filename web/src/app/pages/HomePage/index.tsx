import * as React from 'react';
import Wallet from 'app/common/components/Wallet';
import { Helmet } from 'react-helmet-async';
import { Container, Header, StyledButton } from 'app/common/styles';
import { useHistory } from 'react-router-dom';
import { selectUser } from 'utils/SessionActions/SessionSelector';
import { useSelector } from 'react-redux';
import { PageContainer } from 'app/common/components';

export function HomePage() {
  const history = useHistory();
  const user = useSelector(selectUser);
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Luxurify - Homepage" />
      </Helmet>

      <Container>
        <PageContainer
          innerStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: '5rem',
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
      </Container>
    </>
  );
}
