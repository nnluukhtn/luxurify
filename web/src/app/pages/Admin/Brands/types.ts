import { ApiResponse } from './../../../../global/services/api/types';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type AdminBrandsActions = ActionType<typeof actions>;

export interface AdminBrandsState {
  readonly byId?: BrandByIds;
  readonly allIds?: number[];
  readonly isLoading: boolean;
}

export interface BrandByIds {
  [id: number]: BrandInfo;
}

export interface BrandInfo {
  id: number;
  brand: Brand;
  user: User;
  status: string;
  created_at: string;
}

export interface Brand {
  id: number;
  name: string;
  category: string;
  status: string;
  bir_2303_certification_url: string;
  certificate_of_registration_url: string;
}

export interface User {
  id: number;
  email: string;
  created_at: string;
}

export interface BrandsResponse extends ApiResponse {
  response: {
    brands: Brand[];
  };
}
