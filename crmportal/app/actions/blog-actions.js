import * as types from '../actions/action-types';

export function getBlogsSuccess(blogs) {
  return {
    type: types.GET_BLOGS_SUCCESS,
    blogs
  };
}

export function getBlogSuccess(blog) {
  return {
    type: types.GET_BLOG_SUCCESS,
    blog
  };
}

export function addBlogSuccess(blog) {
  return {
    type: types.ADD_BLOG_SUCCESS,
    blog
  };
}

export function deleteBlogSuccess(blog) {
  return {
    type: types.DELETE_BLOG_SUCCESS,
    blog
  };
}
