import { UserParams, UserPayload } from './types';

export const createUserAdapter = (userPayload: UserPayload): UserParams => {
  return {
    user: {
      email: userPayload.email,
      password: userPayload.password,
      password_confirmation: userPayload.password_confirmation,
    },
  };
};
