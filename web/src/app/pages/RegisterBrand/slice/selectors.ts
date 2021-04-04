import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.registerBrand || initialState;

export const makeSelectWSBrands = createSelector(
  [selectSlice],
  state => state.brands || [],
);

export const makeSelectWSBrandOptions = createSelector(
  makeSelectWSBrands,
  brands =>
    brands.map(brand => ({
      label: brand.name,
      value: brand.name,
    })),
);
