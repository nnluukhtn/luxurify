import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}
const Balance = ({ children }: Props) => {
  return (
    <BalanceContainer>
      <BalanceLabel>Balance: </BalanceLabel>
      <BalanceNumber>{children}</BalanceNumber>
    </BalanceContainer>
  );
};

export default Balance;

const BalanceContainer = styled.div`
  border: 0.13rem solid #0aa50a;
  border-radius: 0.5rem;
  width: fit-content;
  height: fit-content;
  padding: 0.5rem 1rem;
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

const BalanceLabel = styled.div`
  font-weight: 400;
`;

const BalanceNumber = styled.div`
  margin-left: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-left: 0.1rem solid lightgrey;
  padding-left: 0.8rem;
`;
