import { action } from 'typesafe-actions';
import ActionTypes from './actionTypes';

export const getAdminData = () => action(ActionTypes.GET_ADMIN_DATA, {});
