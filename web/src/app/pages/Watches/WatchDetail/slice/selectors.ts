import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.watchDetail || initialState;

export const selectWatchDetail = createSelector([selectSlice], state => state);
