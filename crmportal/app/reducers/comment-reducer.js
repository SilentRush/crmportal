import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  comments: {
    hits:[],
  },
  comment: {
    _source:{
      rawbody:{}
    }
  }
};

const commentReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_COMMENTS_SUCCESS:
      return Object.assign({}, state, { comments: action.comments });

    case types.GET_COMMENT_SUCCESS:
      return Object.assign({}, state, { comment: action.comment });

    case types.ADD_COMMENT_SUCCESS:
      var items = [].concat(state.comments.hits);
      return Object.assign({}, state, {
        comments: {
          hits: items.concat([action.comment])
        }
      });

    case types.DELETE_COMMENT_SUCCESS:
      var items = [].concat(state.comments.hits);
      return Object.assign({}, state, {
        comments: {
          hits: items.filter((item) =>{
            return item._id != action.comment._id
          })
        }
      });

  }

  return state;

}

export default commentReducer;
