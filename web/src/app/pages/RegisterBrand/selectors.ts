import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectSlice = (state: RootState) => state.registerBrand || initialState;

export const selectRegisterBrand = createSelector(
  [selectSlice],
  state => state,
);
