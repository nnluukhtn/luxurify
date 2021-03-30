import * as React from 'react';
import Wallet from 'app/common/components/Wallet';
import { Helmet } from 'react-helmet-async';
import { StyledButton } from 'app/common/styles';
import { useHistory } from 'react-router-dom';

export function HomePage() {
  const history = useHistory();
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Luxurify - Homepage" />
      </Helmet>

      <div
        style={{
          margin: '2rem auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <h3 style={{ margin: '0.5rem 1rem' }}>HomePage: Wallet</h3>
        <StyledButton
          type="link"
          onClick={() => history.push('/register-brand')}
          style={{ marginBottom: '1rem' }}
        >
          Register a Brand
        </StyledButton>
        <Wallet />
      </div>
    </>
  );
}
