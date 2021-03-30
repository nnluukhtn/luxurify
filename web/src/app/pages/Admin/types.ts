import { AdminBrandsState } from './Brands/types';
import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import * as brandActions from './Brands/actions';

export type AdminActions = ActionType<typeof actions & typeof brandActions>;

export interface AdminState {
  readonly brand?: AdminBrandsState;
}
