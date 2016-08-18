import axios from 'axios';
import store from '../store';
import { getUsersSuccess, getUserSuccess } from '../actions/user-actions';
import {encodeObjectToUriString} from '../components/Utility/AuthenticationWrapper';
import {apiBaseUrl} from './config';
import {Logout} from '../components/Utility/Logout';

axios.defaults.baseURL = apiBaseUrl;

/**
 * Get all users
 */

export function getUsers(from,size) {
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
    })
    .catch(function(error){
      if(error.status == 401)
        Logout();
    });
}


/**
 * Search users
 */

export function searchUsers(value,from,size) {
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

export function getUser(userId) {
  let params = {
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url:'/users/' + userId + encodeObjectToUriString(params)
  }).then(function(response){
    store.dispatch(getUserSuccess(response.data));
  })
  .catch(function(error){
    if(error.status == 401)
      Logout();
  });
}

export function getUserFromStore(userid){
  let userStore = store.getState().userState;
  let user = userStore.users.hits.filter((user)=>{
      return user._id === userid
  });
  return user[0];
}
