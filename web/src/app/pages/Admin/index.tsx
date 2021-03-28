import { NotFoundPage } from 'app/common/components/NotFoundPage/Loadable';
import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { selectIsAuthenticated } from 'utils/SessionActions/SessionSelector';
import { AdminSignIn } from './SignIn/Loadable';

export function Admin() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Switch>
      {!isAuthenticated && (
        <Route exact path="/admin/sign-in" component={AdminSignIn} />
      )}
      {!isAuthenticated && (
        <Redirect
          from="/admin"
          to={`/sign-in?redirect=${window.location.pathname}`}
        />
      )}
      {isAuthenticated && <Route path="/admin" children={<>Admin Page</>} />}
      <Route component={NotFoundPage} />
    </Switch>
  );
}
