import { Button, PageHeader, PageHeaderProps, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
        <Typography.Title level={3} style={{ marginTop: '0.3rem' }}>
          Luxurify
        </Typography.Title>
      }
      subTitle={<Subtitle user={user} isAuthenticated={isAuthenticated} />}
      extra={[
        isAuthenticated ? (
          <Button key="3" onClick={() => history.push('/register-brand')}>
            Register Brand
          </Button>
        ) : null,
        isAuthenticated ? (
          <Button key="2" onClick={() => history.push('/register-watch')}>
            Register Watch
          </Button>
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
