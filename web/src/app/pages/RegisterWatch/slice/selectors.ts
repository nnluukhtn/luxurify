import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.registerWatch || initialState;

export const makeSelectWSWatchById = createSelector(
  [selectSlice],
  subState => subState.wsWatchData?.byId || {},
);

export const makeSelectWSWatch = (refNum: string) =>
  createSelector(makeSelectWSWatchById, watchById => watchById[refNum]);

export const makeSelectWSWatchLoading = createSelector(
  [selectSlice],
  subState => subState.isLoading,
);
