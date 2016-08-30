import * as types from '../actions/action-types';

export function getHistoriesSuccess(histories) {
  return {
    type: types.GET_HISTORIES_SUCCESS,
    histories: histories
  };
}

export function getHistorySuccess(history) {
  return {
    type: types.GET_HISTORY_SUCCESS,
    history: history
  };
}
