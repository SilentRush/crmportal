import axios from 'axios';
import store from '../store';
import { getAccountsSuccess, getAccountSuccess } from '../actions/account-actions';
import {encodeObjectToUriString} from '../components/Utility/AuthenticationWrapper';
import {apiBaseUrl} from './config';
import {Logout} from '../components/Utility/Logout';

axios.defaults.baseURL = apiBaseUrl;
/**
 * Get all users
 */

export function getAccounts(from,size) {
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
  })
  .catch(function(error){
    if(error.status == 401)
      Logout();
  });
}


export function updateAccount(account) {
  account.token = localStorage.token;
  account.userid = localStorage.userid;
  account.saleslogixAuth = localStorage.saleslogixAuth;
  return axios({
    method: 'put',
    url: '/accounts/' + account.accountid,
    data: account})
    .then(response => {
      let account = response.data;
      //store.dispatch(addCommentSuccess(comment));
    })
    .catch(function(error){
      if(error.status == 401)
        Logout();
    });
}

/**
 * Search users
 */

export function searchAccounts(value,from,size) {
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
    })
    .catch(function(error){
      if(error.status == 401)
        Logout();
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
    })
    .catch(function(error){
      if(error.status == 401)
        Logout();
    });
}

/**
 * getProfile() is much more complex because it has to make
 * three XHR requests to get all the profile info.
 */

export function getAccount(accountId) {
  let params = {
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url:'/accounts/' + accountId + encodeObjectToUriString(params)
  }).then(function(response){
    store.dispatch(getAccountSuccess(response.data._source));
  })
  .catch(function(error){
    if(error.status == 401)
      Logout();
  });
}
