import axios from 'axios';
import store from '../store';
import instance from './connection-config'
import { getAccountsSuccess, getAccountSuccess } from '../actions/account-actions';

/**
 * Get all users
 */

export function getAccounts() {
  axios.defaults.baseURL = 'http://api.twilkislinux.sssworld-local.com/';
  return axios.get("/accounts")
    .then(function(response){
      console.log(response.data);
      store.dispatch(getAccountsSuccess(response.data.hits.hits));
    });
}


/**
 * Search users
 */

export function searchAccounts(query = '') {
  return axios.get('http://localhost:3001/users?q='+ query)
    .then(response => {
      store.dispatch(getTicketsSuccess(response.data));
      return response;
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
