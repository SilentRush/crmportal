import axios from 'axios';
import store from '../store';
import { addBlogSuccess, getBlogsSuccess, getBlogSuccess, deleteBlogSuccess } from '../actions/blog-actions';
import {encodeObjectToUriString} from '../components/Utility/AuthenticationWrapper';
import {apiBaseUrl} from './config';
import {Logout} from '../components/Utility/Logout';

axios.defaults.baseURL = apiBaseUrl;

/**
 * Get all users
 */

export function getBlogs(from,size) {
  let params = {
    "from": from,
    "size": size,
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url: '/blogs' + encodeObjectToUriString(params)
   })
    .then(function(response){
      let comments = response.data.hits;
      store.dispatch(getBlogsSuccess(comments));
    })
    .catch(function(error){
      if(error.status == 401)
        Logout();
    });
}

/**
 * create blog
 */

export function addBlog(blog) {
  blog.token = localStorage.token;
  blog.userid = localStorage.userid;
  return axios({
    method: 'post',
    url: '/blogs',
    data: blog})
    .then(response => {
      let blog = response.data;
      store.dispatch(addBlogSuccess(blog));
    })
    .catch(function(error){
      if(error.status == 401)
        Logout();
    });
}

export function updateBlog(blog) {
  comment.token = localStorage.token;
  comment.userid = localStorage.userid;
  return axios({
    method: 'put',
    url: '/blogs/' + blog.blogid,
    data: comment})
    .then(response => {
      let blog = response.data;
      //store.dispatch(addCommentSuccess(comment));
    })
    .catch(function(error){
      if(error.status == 401)
        Logout();
    });
}

/**
 * Search blog
 */

export function searchBlogs(value,from,size) {
  return axios({
    method: 'post',
    url: '/search/blogs',
    data: {
    "value":value,
    "from":from,
    "size":size,
    "userid":localStorage.userid,
    "token":localStorage.token
  }})
    .then(response => {
      let blogs = response.data.hits;
      store.dispatch(getBlogsSuccess(blogs));
    })
    .catch(function(error){
      if(error.status == 401)
        Logout();
    });
}


/**
 * Delete a blog
 */

export function deleteBlog(blogId) {
  return axios({
    method: 'delete',
    url: '/blogs/' + blogId,
    data: {
    "userid":localStorage.userid,
    "token":localStorage.token
  }})
    .then(response => {
      store.dispatch(deleteBlogSuccess(response.data));
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

export function getBlog(blogId) {
  let params = {
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url:'/blogs/' + blogId  + encodeObjectToUriString(params)
  }).then(function(response){
    store.dispatch(getBlogSuccess(response.data));
  })
  .catch(function(error){
    if(error.status == 401)
      Logout();
  });
}
