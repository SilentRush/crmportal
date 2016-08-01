import * as types from '../actions/action-types';

export function getCommentsSuccess(comments) {
  return {
    type: types.GET_COMMENTS_SUCCESS,
    comments
  };
}

export function getCommentSuccess(comment) {
  return {
    type: types.GET_COMMENT_SUCCESS,
    comment
  };
}

export function addCommentSuccess(comment) {
  return {
    type: types.ADD_COMMENT_SUCCESS,
    comment
  };
}

export function deleteCommentSuccess(comment) {
  return {
    type: types.DELETE_COMMENT_SUCCESS,
    comment
  };
}
