import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  blogs: {
    hits:[],
  },
  blog: {
    _source:{
      rawbody:{}
    }
  }
};

const blogReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_BLOGS_SUCCESS:
      return Object.assign({}, state, { blogs: action.blogs });

    case types.GET_BLOG_SUCCESS:
      return Object.assign({}, state, { blog: action.blog });

    case types.ADD_BLOG_SUCCESS:
      var items = [].concat(state.blogs.hits);
      return Object.assign({}, state, {
        comments: {
          hits: items.concat([action.blog])
        }
      });

    case types.DELETE_BLOG_SUCCESS:
      var items = [].concat(state.blogs.hits);
      return Object.assign({}, state, {
        blogs: {
          hits: items.filter((item) =>{
            return item._id != action.blog._id
          })
        }
      });

  }

  return state;

}

export default blogReducer;
