import axios from 'axios';
import store from '../store';
import instance from './connection-config'
import { getAccountsSuccess, getAccountSuccess } from '../actions/account-actions';

/**
 * Get all users
 */

export function getAccounts(from,size) {
  axios.defaults.baseURL = 'http://api.twilkislinux.sssworld-local.com/';
  return axios.get("/accounts?from=" + from + "&size=" + size)
    .then(function(response){
      store.dispatch(getAccountsSuccess(response.data.hits));
    });
}


/**
 * Search users
 */

export function searchAccounts(value,from,size) {
  axios.defaults.baseURL = 'http://api.twilkislinux.sssworld-local.com/';
  return axios({
      method: 'post',
      url: '/search/accounts',
      data: {
      "value":value,
      "from":from,
      "size":size
    }})
    .then(response => {
      let accounts = response.data.hits;
      store.dispatch(getAccountsSuccess(accounts));
    });
}

/**
 * Delete a user
 */

export function deleteUser(userId) {
  return axios.delete('http://localhost:3001/users/' + userId)
    .then(response => {
      store.dispatch(deleteUserSuccess(userId));
      return response;
    });
}

/**
 * getProfile() is much more complex because it has to make
 * three XHR requests to get all the profile info.
 */

export function getAccount(accountId) {
  axios.defaults.baseURL = 'http://api.twilkislinux.sssworld-local.com/';
  return axios.get("/accounts/" + accountId).then(function(response){
    store.dispatch(getAccountSuccess(response.data._source));
  });
}
