import axios from 'axios';
import store from '../store';
import instance from './connection-config'
import { getAccountsSuccess, getAccountSuccess } from '../actions/account-actions';
import {encodeObjectToUriString} from '../components/Utility/AuthenticationWrapper'

/**
 * Get all users
 */

export function getAccounts(from,size) {
  axios.defaults.baseURL = 'http://api.twilkislinux.sssworld-local.com/';
  let params = {
    "from": from,
    "size": size,
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url:'/accounts' + encodeObjectToUriString(params)
  })
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
      "value":value.toString(),
      "from":from.toString(),
      "size":size.toString(),
      "userid": localStorage.userid.toString(),
      "token": localStorage.token.toString()
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
  let params = {
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url:'/accounts/' + accountId + encodeObjectToUriString(params)
  }).then(function(response){
    store.dispatch(getAccountSuccess(response.data._source));
  });
}
