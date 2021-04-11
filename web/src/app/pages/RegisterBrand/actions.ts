import { action } from 'typesafe-actions';
import ActionTypes from './actionTypes';
import { registerBrandAdapter } from './adapter';
import { BrandPayload, RegisterBrandResponse } from './types';

export const registerBrand = (
  brandPayload: BrandPayload,
  callback?: (response: RegisterBrandResponse) => void,
) => {
  const params: any = registerBrandAdapter(brandPayload);
  return action(ActionTypes.REGISTER_BRAND, { params, callback });
};
