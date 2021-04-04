/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import sessionReducer from 'utils/SessionActions/SessionReducer';
import { InjectedReducersType } from 'utils/types/injector-typings';
import history from '../utils/history';
import registerBrandReducer from 'app/pages/RegisterBrand/slice';
import registerWatchReducer from 'app/pages/RegisterWatch/slice';
import brandReducer from 'app/pages/Admin/Brands/slice';
import { adminReducer } from 'app/pages/Admin';

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
    registerWatch: registerWatchReducer,
    adminBrands: brandReducer,
    admin: adminReducer,
    ...injectedReducers,
  });
}
// }
