import * as types from '../actions/action-types';

export function getAccountsSuccess(accounts) {
  return {
    type: types.GET_ACCOUNTS_SUCCESS,
    accounts: accounts
  };
}

export function getAccountSuccess(account) {
  return {
    type: types.GET_ACCOUNT_SUCCESS,
    account: account
  }
}

export function getAccountNamesSuccess(accountnames) {
  return {
    type: types.GET_ACCOUNTNAMES_SUCCESS,
    accountnames: accountnames
  }
}
