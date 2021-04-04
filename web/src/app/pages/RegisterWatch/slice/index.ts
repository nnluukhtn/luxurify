import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { registerWatchSaga } from './saga';
import { FetchWSBrandsPayload, RegisterWatchState } from './types';

export const initialState: RegisterWatchState = { isLoading: false };

const registerWatchSlice = createSlice({
  name: 'registerWatch',
  initialState,
  reducers: {
    fetchWSWatchData(state, _action: PayloadAction<FetchWSBrandsPayload>) {
      return {
        ...state,
        isLoading: true,
      };
    },
    //
    fetchWSWatchDataSuccess(state, action) {
      const refNum = action.payload.refNum;
      const data = action.payload.data;
      return {
        ...state,
        wsWatchData: {
          ...state.wsWatchData,
          byId: {
            ...state.wsWatchData?.byId,
            [refNum]: data,
          },
        },
        isLoading: false,
      };
    },
    //
    fetchWSWatchDataFailed(state, _action) {
      return {
        ...state,
        isLoading: false,
      };
    },
    //
    registerWatch(state, _action) {
      return state;
    },
  },
});

export const {
  registerWatch,
  fetchWSWatchData,
  fetchWSWatchDataSuccess,
  fetchWSWatchDataFailed,
} = registerWatchSlice.actions;

export default registerWatchSlice.reducer;

export const useRegisterWatchSlice = () => {
  useInjectReducer({
    key: registerWatchSlice.name,
    reducer: registerWatchSlice.reducer,
  });
  useInjectSaga({ key: registerWatchSlice.name, saga: registerWatchSaga });
  return { actions: registerWatchSlice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useRegisterWatchSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
