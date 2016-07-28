import axios from 'axios';
import store from '../store';
import instance from './connection-config'
import { addCommentSuccess, getCommentsSuccess, getCommentSuccess } from '../actions/comment-actions';

/**
 * Get all users
 */
 const API_ROOT = 'http://api.twilkislinux.sssworld-local.com/';

export function getComments(type,entityid,from,size) {
  axios.defaults.baseURL = API_ROOT;
  return axios.get("/search/comments/entity?from=" + from + "&size=" + size + "&type=" + type + "&entityid=" + entityid)
    .then(function(response){
      console.log(response);
      let comments = response.data.hits;
      store.dispatch(getCommentsSuccess(comments));
    });
}

/**
 * create comment
 */

export function addComment(comment) {
  axios.defaults.baseURL = API_ROOT;
  return axios({
    method: 'post',
    url: '/comments',
    data: comment})
    .then(response => {
      let comment = response.data;
      store.dispatch(addCommentSuccess(comment));
    })
    .catch(error => {
      console.log(error);
    });
}

/**
 * Search users
 */

export function searchComments(value,from,size) {
  axios.defaults.baseURL = API_ROOT;
  return axios({
    method: 'post',
    url: '/search/comments',
    data: {
    "value":value,
    "from":from,
    "size":size
  }})
    .then(response => {
      let comments = response.data.hits;
      store.dispatch(getCommentsSuccess(comments));
    })
    .catch(error => {
      console.log(error);
    });
}


/**
 * Delete a user
 */

export function deleteComment(userId) {
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

export function getComment(commentId) {
  axios.defaults.baseURL = API_ROOT;
  return axios.get("/comments/" + commentId).then(function(response){
    store.dispatch(getCommentSuccess(response.data));
  });
}
