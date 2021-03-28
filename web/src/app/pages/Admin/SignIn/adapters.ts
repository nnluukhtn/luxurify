import { SignInPayload } from 'app/pages/SignIn/types';
import { AdminSignInParams } from './types';

export const adminSignInAdapter = (
  userPayload: SignInPayload,
): AdminSignInParams => {
  return {
    admin: {
      email: userPayload.email,
      password: userPayload.password,
    },
  };
};
