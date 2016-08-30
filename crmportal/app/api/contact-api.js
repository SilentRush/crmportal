import axios from 'axios';
import store from '../store';
import { getContactsSuccess, getContactSuccess, getContactNamesSuccess } from '../actions/contact-actions';
import {encodeObjectToUriString} from '../components/Utility/AuthenticationWrapper';
import {apiBaseUrl} from './config';
import {Logout} from '../components/Utility/Logout';

axios.defaults.baseURL = apiBaseUrl;
/**
 * Get all users
 */

export function getContacts(from,size) {
  let params = {
    "from": from,
    "size": size,
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url:'/contacts' + encodeObjectToUriString(params)
  })
  .then(function(response){
    store.dispatch(getContactsSuccess(response.data.hits));
  })
  .catch(function(error){
    if(error.status == 401)
      Logout();
  });
}

export function getContactNames(){
  let params = {
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url:'/getContactNames' + encodeObjectToUriString(params)
  })
  .then(function(response){
    store.dispatch(getContactNamesSuccess(response.data.aggregations.contactnames.buckets.map((name)=>{return name.key})));
  })
  .catch(function(error){
    if(error.status == 401)
      Logout();
  });
}


export function updateContact(contact) {
  contact.token = localStorage.token;
  contact.userid = localStorage.userid;
  contact.saleslogixAuth = localStorage.saleslogixAuth;
  return axios({
    method: 'put',
    url: '/contacts/' + contact.contactid,
    data: contact})
    .then(response => {
      let contact = response.data;
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

export function searchContacts(value,from,size) {
  return axios({
      method: 'post',
      url: '/search/contacts',
      data: {
      "value":value.toString(),
      "from":from.toString(),
      "size":size.toString(),
      "userid": localStorage.userid.toString(),
      "token": localStorage.token.toString()
    }})
    .then(response => {
      let contacts = response.data.hits;
      store.dispatch(getContactsSuccess(contacts));
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

export function getContact(contactId) {
  let params = {
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url:'/contacts/' + contactId + encodeObjectToUriString(params)
  }).then(function(response){
    store.dispatch(getContactSuccess(response.data._source));
  })
  .catch(function(error){
    if(error.status == 401)
      Logout();
  });
}
