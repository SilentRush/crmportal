import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  accounts: {
    hits:[
      {
        _source:{
          accountname: '',
          accountid: '',
          notes: '',
          address:{
            streetaddress: '',
            city: '',
            state: '',
            zip: ''
          }
        }
      }
    ]
  },
  account: {
    address:{}
  }
};

const accountReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_ACCOUNTS_SUCCESS:
      return Object.assign({}, state, { accounts: action.accounts });

    case types.GET_ACCOUNT_SUCCESS:
      return Object.assign({}, state, { account: action.account });

  }

  return state;

}

export default accountReducer;
