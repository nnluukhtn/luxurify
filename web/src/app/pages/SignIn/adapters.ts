import { SignInParams, SignInPayload } from './types';

export const signInAdapter = (userPayload: SignInPayload): SignInParams => {
  return {
    user: {
      email: userPayload.email,
      password: userPayload.password,
    },
  };
};
