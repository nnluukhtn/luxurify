/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import sessionReducer from 'utils/SessionActions/SessionReducer';
import { InjectedReducersType } from 'utils/types/injector-typings';
import history from '../utils/history';
import registerBrandReducer from 'app/pages/RegisterBrand/reducers';
import adminReducer from 'app/pages/Admin/reducer';
import brandReducer from 'app/pages/Admin/Brands/slice';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  // if (Object.keys(injectedReducers).length === 0) {
  //   return state => state;
  // } else {
  return combineReducers({
    router: connectRouter(history),
    session: sessionReducer,
    registerBrand: registerBrandReducer,
    brands: brandReducer,
    admin: adminReducer,
    ...injectedReducers,
  });
}
// }
