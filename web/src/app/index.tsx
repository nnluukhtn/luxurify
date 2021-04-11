/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './common/components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { SignUp } from './pages/SignUp/Loadable';
import { SignIn } from './pages/SignIn/Loadable';
import { RegisterBrand } from './pages/RegisterBrand/Loadable';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated } from 'utils/SessionActions/SessionSelector';
import { Admin } from './pages/Admin/Loadable';
import styled from 'styled-components';
import { updateSession } from 'utils/SessionActions/SessionActions';
import Cookies from 'js-cookie';
import { useInjectSaga } from 'utils/redux-injectors';
import saga from './saga';
import NavigationBar from './common/components/NavigationBar';
import { RegisterWatch } from './pages/RegisterWatch/Loadable';
import { WatchDetail } from './pages/Watches/WatchDetail/Loadable';

export function App() {
  useInjectSaga({
    key: 'main',
    saga,
  });
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  // const navigate = useNavigation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isChecked, setChecked] = React.useState(false);

  React.useEffect(() => {
    const checkCookies = () => {
      const accessToken = Cookies.get('accessToken');
      const refreshToken = Cookies.get('refreshToken');
      if (accessToken && refreshToken) {
        const id = Cookies.get('id');
        const email = Cookies.get('email');
        dispatch(updateSession({ user: { id, email } }));
      }
      setChecked(true);
    };
    checkCookies();
  }, [dispatch]);

  if (isAuthenticated === undefined || !isChecked) {
    return <>...Loading...</>;
  }

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Luxurify"
        defaultTitle="Luxurify"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Luxurify Dapp" />
      </Helmet>

      <NavigationBar backIcon={false} />

      <Switch>
        {!isAuthenticated && <Route exact path="/sign-up" component={SignUp} />}
        {!isAuthenticated && <Route exact path="/sign-in" component={SignIn} />}
        <Route path="/admin" component={Admin} />
        {!isAuthenticated && (
          <Redirect
            from="/"
            to={`/sign-in?redirect=${window.location.pathname}`}
          />
        )}
        {isAuthenticated && (
          <Route exact path="/register-brand" component={RegisterBrand} />
        )}
        {isAuthenticated && (
          <Route exact path="/register-watch" component={RegisterWatch} />
        )}
        {isAuthenticated && (
          <Route exact path="/watches/:watchId" component={WatchDetail} />
        )}
        {isAuthenticated && <Route path="/" component={HomePage} />}
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export const SignedInInfo = styled.div<{ isLoading?: boolean }>`
  width: fit-content;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  padding: 8px 32px;
  margin: 8px auto;
  button {
    display: block;
    position: relative;
    opacity: 0;
    transition: all 0.3s;
    transform: translateY(-8px);
    margin: 4px auto;
    border-radius: 5px;
    ${({ isLoading }) =>
      isLoading ? 'opacity: 1;transform: translateY(0);' : ''}
  }
  :hover {
    button {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
