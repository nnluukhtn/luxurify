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
          }}
        >
          <Header style={{ margin: '0.5rem 1rem' }}>HomePage: Wallet</Header>
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
          <StyledButton
            type="link"
            onClick={() => history.push('/register-brand')}
            style={{ marginBottom: '1rem' }}
          >
            Register a Brand
          </StyledButton>
          <Wallet />
        </PageContainer>
      </Container>
    </>
  );
}
