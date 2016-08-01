import * as types from '../actions/action-types';

export function getUsersSuccess(users) {
  return {
    type: types.GET_USERS_SUCCESS,
    users: users
  };
}

export function getUserSuccess(user) {
  return {
    type: types.GET_USER_SUCCESS,
    user: user
  };
}
