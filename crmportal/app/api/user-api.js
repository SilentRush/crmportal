import axios from 'axios';
import store from '../store';
import instance from './connection-config'
import { getUsersSuccess, getUserSuccess } from '../actions/user-actions';
import {encodeObjectToUriString} from '../components/Utility/AuthenticationWrapper'

/**
 * Get all users
 */

export function getUsers(from,size) {
  axios.defaults.baseURL = 'http://api.twilkislinux.sssworld-local.com/';
  let params = {
    "from": from,
    "size": size,
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url:'/users' + encodeObjectToUriString(params)
  })
    .then(function(response){
      store.dispatch(getUsersSuccess(response.data.hits));
    });
}


/**
 * Search users
 */

export function searchUsers(value,from,size) {
  axios.defaults.baseURL = 'http://api.twilkislinux.sssworld-local.com/';
  return axios({
      method: 'post',
      url: '/search/users',
      data: {
      "value":value.toString(),
      "from":from.toString(),
      "size":size.toString(),
      "userid": localStorage.userid.toString(),
      "token": localStorage.token.toString()
    }})
    .then(response => {
      let users = response.data.hits;
      store.dispatch(getUsersSuccess(users));
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

export function getUser(userId) {
  axios.defaults.baseURL = 'http://api.twilkislinux.sssworld-local.com/';
  let params = {
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url:'/users/' + userId + encodeObjectToUriString(params)
  }).then(function(response){
    console.log(response);
    store.dispatch(getUserSuccess(response.data));
  });
}
