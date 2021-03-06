import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';
import { RootState } from 'types';

const selectBrandsState = (state: RootState) => {
  return state.adminBrands || initialState;
};

export const makeSelectBrandsById = createSelector(
  selectBrandsState,
  state => state.byId || {},
);

export const makeSelectBrandsIds = createSelector(
  selectBrandsState,
  state => state.allIds || [],
);

export const makeSelectBrandsLoading = createSelector(
  selectBrandsState,
  state => state.isLoading,
);
