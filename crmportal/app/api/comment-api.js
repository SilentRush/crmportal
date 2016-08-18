import axios from 'axios';
import store from '../store';
import { addCommentSuccess, getCommentsSuccess, getCommentSuccess, deleteCommentSuccess } from '../actions/comment-actions';
import {encodeObjectToUriString} from '../components/Utility/AuthenticationWrapper';
import {apiBaseUrl} from './config';
import {Logout} from '../components/Utility/Logout';

axios.defaults.baseURL = apiBaseUrl;

/**
 * Get all users
 */

export function getComments(type,entityid,from,size) {
  let params = {
    "from": from,
    "size": size,
    "type": type,
    "entityid": entityid,
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url: '/search/comments/entity' + encodeObjectToUriString(params)
   })
    .then(function(response){
      let comments = response.data.hits;
      store.dispatch(getCommentsSuccess(comments));
    })
    .catch(function(error){
      if(error.status == 401)
        Logout();
    });
}

/**
 * create comment
 */

export function addComment(comment) {
  comment.token = localStorage.token;
  comment.userid = localStorage.userid;
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
    })
    .catch(function(error){
      if(error.status == 401)
        Logout();
    });
}

export function updateComment(comment) {
  comment.token = localStorage.token;
  comment.userid = localStorage.userid;
  return axios({
    method: 'put',
    url: '/comments/' + comment.commentid,
    data: comment})
    .then(response => {
      let comment = response.data;
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

export function searchComments(value,from,size) {
  return axios({
    method: 'post',
    url: '/search/comments',
    data: {
    "value":value,
    "from":from,
    "size":size,
    "userid":localStorage.userid,
    "token":localStorage.token
  }})
    .then(response => {
      let comments = response.data.hits;
      store.dispatch(getCommentsSuccess(comments));
    })
    .catch(function(error){
      if(error.status == 401)
        Logout();
    });
}


/**
 * Delete a user
 */

export function deleteComment(commentId) {
  return axios({
    method: 'delete',
    url: '/comments/' + commentId,
    data: {
    "userid":localStorage.userid,
    "token":localStorage.token
  }})
    .then(response => {
      store.dispatch(deleteCommentSuccess(response.data));
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

export function getComment(commentId) {
  let params = {
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url:'/comments/' + commentId  + encodeObjectToUriString(params)
  }).then(function(response){
    store.dispatch(getCommentSuccess(response.data));
  })
  .catch(function(error){
    if(error.status == 401)
      Logout();
  });
}
