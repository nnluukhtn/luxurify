import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { registerBrandSaga } from './saga';
import { RegisterBrandState } from './types';

export const initialState: RegisterBrandState = { isLoading: false };

const registerBrandSlice = createSlice({
  name: 'registerBrand',
  initialState,
  reducers: {
    registerBrand(state, action) {
      return state;
    },

    fetchWSBrands(state, _action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    fetchWSBrandsSuccess(state, action) {
      const brands = action.payload.brands;
      return {
        ...state,
        brands,
        isLoading: true,
      };
    },

    fetchWSBrandsFailed(state, _action) {
      return {
        ...state,
        isLoading: false,
      };
    },
  },
});

export const {
  registerBrand,
  fetchWSBrands,
  fetchWSBrandsSuccess,
  fetchWSBrandsFailed,
} = registerBrandSlice.actions;

export default registerBrandSlice.reducer;

export const useRegisterBrandSlice = () => {
  useInjectReducer({
    key: registerBrandSlice.name,
    reducer: registerBrandSlice.reducer,
  });
  useInjectSaga({ key: registerBrandSlice.name, saga: registerBrandSaga });
  return { actions: registerBrandSlice.actions };
};
