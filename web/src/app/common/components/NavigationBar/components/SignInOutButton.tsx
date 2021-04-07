import { Button } from 'antd';
import { signOut } from 'app/actions';
import { ApiResponse } from 'global/services/api/types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useNotification from 'utils/hooks/NotificationHook/useNotification';

interface Props {
  isAuthenticated: boolean;
  isAdmin: boolean | undefined;
}

const SignInOutButton = ({ isAuthenticated, isAdmin }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setLoading] = React.useState(false);
  const [callSuccess, callError] = useNotification();

  const onSuccessSignOut = (response: ApiResponse) => {
    if (response.success) {
      callSuccess('Successfully sign out.');
      history?.push('/sign-in');
    } else callError('There is an error while trying to sign out.');
    setLoading(false);
  };

  const onSignOut = (event: any) => {
    setLoading(true);
    dispatch(signOut(isAdmin, onSuccessSignOut));
  };

  return isAuthenticated ? (
    <StyledButton
      key="1"
      type="default"
      danger
      onClick={onSignOut}
      loading={isLoading}
    >
      Sign out
    </StyledButton>
  ) : (
    <StyledButton
      key="1"
      type="primary"
      onClick={() => history.push('/sign-in')}
    >
      Sign in
    </StyledButton>
  );
};

export default SignInOutButton;

const StyledButton = styled(Button)``;
