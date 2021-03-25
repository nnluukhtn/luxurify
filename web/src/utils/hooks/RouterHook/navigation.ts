import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { push } from 'connected-react-router';

const useNavigation = () => {
  const dispatch = useDispatch();
  const navigationPush = useCallback(
    (route: string, state: any) => dispatch(push(route, state)),
    [dispatch],
  );
  return (route: string, state?: any) => navigationPush(route, state || {});
};

export default useNavigation;
