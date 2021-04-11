import { Button, PageHeader, PageHeaderProps } from 'antd';
import { Logo } from 'app/common/assets';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  selectIsAuthenticated,
  selectUser,
} from 'utils/SessionActions/SessionSelector';
import SignInOutButton from './components/SignInOutButton';
import Subtitle from './components/Subtitle';

interface ComponentProps {}

type Props = ComponentProps & PageHeaderProps;

const NavigationBar = (props: Props) => {
  const history = useHistory();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  return (
    <PageHeader
      className="site-page-header"
      onBack={() => window.history.back()}
      title={
        <img
          src={Logo}
          alt="logo"
          onClick={() => history.push('/')}
          style={{ cursor: 'pointer', paddingBottom: 4 }}
        />
      }
      subTitle={<Subtitle user={user} isAuthenticated={isAuthenticated} />}
      extra={[
        isAuthenticated ? (
          <StyledButton key="3" onClick={() => history.push('/register-brand')}>
            Register Brand
          </StyledButton>
        ) : null,
        isAuthenticated ? (
          <StyledButton key="2" onClick={() => history.push('/register-watch')}>
            Register Watch
          </StyledButton>
        ) : null,
        <SignInOutButton
          key="1"
          isAuthenticated={isAuthenticated}
          isAdmin={user?.isAdmin}
        />,
      ]}
      {...props}
    ></PageHeader>
  );
};

export default NavigationBar;

const StyledButton = styled(Button)`
  border-radius: 5px;
`;
