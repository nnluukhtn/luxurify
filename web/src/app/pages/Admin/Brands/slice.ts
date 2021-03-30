import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { createSlice } from '@reduxjs/toolkit';
import { AdminBrandsState } from './types';
import saga from './saga';
import _ from 'lodash';

export const initialState: AdminBrandsState = { isLoading: false };

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    fetchPendingBrands: (state, _action) => {
      return { ...state, isLoading: true };
    },

    fetchPendingBrandsSuccess: (_state, action) => {
      const brands = action.payload.brands;
      return {
        byId: _.keyBy(brands, 'id'),
        allIds: brands.map(brand => brand.id),
        isLoading: false,
      };
    },

    fetchPendingBrandsFailed: (state, _action) => {
      return {
        ...state,
        isLoading: false,
      };
    },

    approveBrand: (_state, action) => {},
    rejectBrand: (_state, action) => {},
  },
});

export const {
  fetchPendingBrands,
  fetchPendingBrandsSuccess,
  fetchPendingBrandsFailed,
  approveBrand,
  rejectBrand,
} = brandSlice.actions;

export default brandSlice.reducer;

export const useBrandSlice = () => {
  useInjectReducer({ key: brandSlice.name, reducer: brandSlice.reducer });
  useInjectSaga({ key: brandSlice.name, saga });
  return { actions: brandSlice.actions };
};
