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
  [id: number]: Brand;
}

export interface Brand {
  id: number;
  name: string;
  category: string;
}

export interface BrandsResponse extends ApiResponse {
  response: {
    brands: Brand[];
  };
}
