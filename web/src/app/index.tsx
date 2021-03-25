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
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from 'utils/SessionActions/SessionSelector';

export function App() {
  const { i18n } = useTranslation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  console.log({ isAuthenticated });

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Luxurify"
        defaultTitle="Luxurify"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Luxurify Dapp" />
      </Helmet>

      <Switch>
        {!isAuthenticated && <Route exact path="/sign-up" component={SignUp} />}
        {!isAuthenticated && <Route exact path="/sign-in" component={SignIn} />}
        {!isAuthenticated && (
          <Redirect
            from="/"
            to={`/sign-in?redirect=${window.location.pathname}`}
          />
        )}
        {isAuthenticated && (
          <Route exact path="/register-brand" component={RegisterBrand} />
        )}
        {isAuthenticated && <Route path="/" component={HomePage} />}
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
