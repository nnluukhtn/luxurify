import { Reducer } from '@reduxjs/toolkit';
import _ from 'lodash';
import ActionTypes from './actionTypes';
import { AdminBrandsActions, AdminBrandsState } from './types';

export const initialBrandState: AdminBrandsState = {
  isLoading: false,
};

const adminBrandReducer: Reducer<AdminBrandsState, AdminBrandsActions> = (
  state: AdminBrandsState = initialBrandState,
  action: AdminBrandsActions,
) => {
  switch (action.type) {
    case ActionTypes.FETCH_PENDING_BRANDS:
      return {
        ...state,
        isLoading: true,
      };
    //
    case ActionTypes.FETCH_PENDING_BRANDS_SUCCESS:
      const brands = action.payload.brands;
      return {
        byId: _.keyBy(brands, 'id'),
        allId: brands.map(brand => brand.id),
        isLoading: true,
      };
    //
    case ActionTypes.FETCH_PENDING_BRANDS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    //
    default:
      return state;
  }
};

export default adminBrandReducer;
