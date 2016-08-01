import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  users: {
    hits:[
      {
        _source:{
        }
      }
    ]
  },
  user: {
    _source:{
      
    }
  }
};

const userReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_USERS_SUCCESS:
      return Object.assign({}, state, { users: action.users });

    case types.GET_USER_SUCCESS:
      return Object.assign({}, state, { user: action.user });

  }

  return state;

}

export default userReducer;
