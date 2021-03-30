import { ApiResponse } from 'global/services/api/types';
import { action } from 'typesafe-actions';
import ActionTypes from './actionTypes';

export const fetchPendingBrands = () =>
  action(ActionTypes.FETCH_PENDING_BRANDS, {});

export const fetchPendingBrandsSuccess = (response: ApiResponse) =>
  action(ActionTypes.FETCH_PENDING_BRANDS_SUCCESS, {
    brands: response.response.brands,
  });

export const fetchPendingBrandsFailed = () =>
  action(ActionTypes.FETCH_PENDING_BRANDS_FAILED, {});

export const approveBrand = (brandId: number) =>
  action(ActionTypes.APPROVE_BRAND_REQUEST, { brandId });

export const rejectBrand = (brandId: number) =>
  action(ActionTypes.REJECT_BRAND_REQUEST, { brandId });
