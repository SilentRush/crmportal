import axios from 'axios';
import store from '../store';
import { getHistoriesSuccess, getHistorySuccess } from '../actions/history-actions';
import {encodeObjectToUriString} from '../components/Utility/AuthenticationWrapper';
import {apiBaseUrl} from './config';
import {Logout} from '../components/Utility/Logout';

axios.defaults.baseURL = apiBaseUrl;
/**
 * Get all users
 */

export function getHistories(from,size) {
  let params = {
    "from": from,
    "size": size,
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url:'/histories' + encodeObjectToUriString(params)
  })
  .then(function(response){
    store.dispatch(getHistoriesSuccess(response.data.hits));
  })
  .catch(function(error){
    if(error.status == 401)
      Logout();
  });
}


export function updateHistory(history) {
  history.token = localStorage.token;
  history.userid = localStorage.userid;
  history.saleslogixAuth = localStorage.saleslogixAuth;
  return axios({
    method: 'put',
    url: '/histories/' + history.historyid,
    data: history})
    .then(response => {
      let history = response.data;
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

export function searchHistories(value,account,contact,from,size) {
  let Value,Account,Contact,From,Size;
  if(value)
    Value = value.toString();
  if(account)
    Account = account.toString();
  if(contact)
    Contact = contact.toString();
  if(from)
    From = from.toString();
  if(size)
    Size = size.toString();
  return axios({
      method: 'post',
      url: '/search/histories',
      data: {
      "value":Value,
      "account":Account,
      "contact":Contact,
      "from":From,
      "size":Size,
      "userid": localStorage.userid.toString(),
      "token": localStorage.token.toString()
    }})
    .then(response => {
      let histories = response.data.hits;
      store.dispatch(getHistoriesSuccess(histories));
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

export function getHistory(historyId) {
  let params = {
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url:'/histories/' + historyId + encodeObjectToUriString(params)
  }).then(function(response){
    store.dispatch(getHistorySuccess(response.data._source));
  })
  .catch(function(error){
    if(error.status == 401)
      Logout();
  });
}
