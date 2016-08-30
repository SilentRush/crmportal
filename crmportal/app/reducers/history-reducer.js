import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  histories: {
    hits:[
      {
        _source:{
          historyid:''
        }
      }
    ]
  },
  history: {
  }
};

const historyReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_HISTORIES_SUCCESS:
      return Object.assign({}, state, { histories: action.histories });

    case types.GET_HISTORY_SUCCESS:
      return Object.assign({}, state, { history: action.history });

  }

  return state;

}

export default historyReducer;
