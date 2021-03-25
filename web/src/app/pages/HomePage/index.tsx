import * as React from 'react';
import Wallet from 'app/common/components/Wallet';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Luxurify - Homepage" />
      </Helmet>

      <h3 style={{ margin: '2rem 1rem' }}>HomePage: Wallet</h3>
      <Wallet />
    </>
  );
}
