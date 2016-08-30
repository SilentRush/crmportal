import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  contacts: {
    hits:[
      {
        _source:{
          contactname: '',
          accountname: '',
          contactid: '',
          fullname: ''
        }
      }
    ]
  },
  contact: {
  },
  contactnames: [

  ]
};

const contactReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_CONTACTS_SUCCESS:
      return Object.assign({}, state, { contacts: action.contacts });

    case types.GET_CONTACT_SUCCESS:
      return Object.assign({}, state, { contact: action.contact });

    case types.GET_CONTACTNAMES_SUCCESS:
      return Object.assign({}, state, { contactnames: action.contactnames });

  }

  return state;

}

export default contactReducer;
