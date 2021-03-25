import { createSelector } from 'reselect';
import { RootState } from 'types';

const selectRoute = (state: RootState) => state.router;

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.location);

export { makeSelectLocation };
