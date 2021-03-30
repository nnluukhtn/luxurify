import { RegisterBrandActions, RegisterBrandState } from './types';

const registerBrandReducer = (
  state: RegisterBrandState = {},
  action: RegisterBrandActions,
): RegisterBrandState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default registerBrandReducer;
