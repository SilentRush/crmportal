import axios from 'axios';
import store from '../store';
import instance from './connection-config'
import { addBlogSuccess, getBlogsSuccess, getBlogSuccess, deleteBlogSuccess } from '../actions/blog-actions';
import {encodeObjectToUriString} from '../components/Utility/AuthenticationWrapper'

/**
 * Get all users
 */
 const API_ROOT = 'http://api.twilkislinux.sssworld-local.com/';

export function getBlogs(from,size) {
  axios.defaults.baseURL = API_ROOT;
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
      store.dispatch(getCommentsSuccess(comments));
    });
}

/**
 * create blog
 */

export function addBlog(blog) {
  blog.token = localStorage.token;
  blog.userid = localStorage.userid;
  axios.defaults.baseURL = API_ROOT;
  return axios({
    method: 'post',
    url: '/blogs',
    data: blog})
    .then(response => {
      let blog = response.data;
      store.dispatch(addBlogSuccess(blog));
    })
    .catch(error => {
      console.log(error);
    });
}

export function updateBlog(blog) {
  comment.token = localStorage.token;
  comment.userid = localStorage.userid;
  axios.defaults.baseURL = API_ROOT;
  return axios({
    method: 'put',
    url: '/blogs/' + blog.blogid,
    data: comment})
    .then(response => {
      let blog = response.data;
      //store.dispatch(addCommentSuccess(comment));
    })
    .catch(error => {
      console.log(error);
    });
}

/**
 * Search blog
 */

export function searchBlogs(value,from,size) {
  axios.defaults.baseURL = API_ROOT;
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
    .catch(error => {
      console.log(error);
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
    .catch(error => {
      console.log(error);
    });
}

/**
 * getProfile() is much more complex because it has to make
 * three XHR requests to get all the profile info.
 */

export function getBlog(blogId) {
  axios.defaults.baseURL = API_ROOT;
  let params = {
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url:'/blogs/' + blogId  + encodeObjectToUriString(params)
  }).then(function(response){
    store.dispatch(getBlogSuccess(response.data));
  });
}
