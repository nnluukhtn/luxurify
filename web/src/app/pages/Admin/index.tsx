import { NotFoundPage } from 'app/common/components/NotFoundPage/Loadable';
import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { selectIsAuthenticated } from 'utils/SessionActions/SessionSelector';
import { Brands } from './Brands';
import { AdminSignIn } from './SignIn/Loadable';
import { AdminActions, AdminState } from './types';
import { useInjectReducer } from 'utils/redux-injectors';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
// import adminReducer from './reducer';

export const initialState: AdminState = {};

const slice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminReducer(AdminState, action: PayloadAction<AdminActions>) {},
  },
});

export const { actions: adminActions } = slice;

export const useRegisterBrandSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  // useInjectSaga({ key: slice.name, saga: registerBrandSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useRegisterBrandSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */

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
      {isAuthenticated && (
        <Route exact path="/admin/brands" component={Brands} />
      )}
      {isAuthenticated && <Redirect from="/admin" to="/admin/brands" />}
      <Route component={NotFoundPage} />
    </Switch>
  );
}
