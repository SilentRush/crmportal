import * as types from '../actions/action-types';

export function getContactsSuccess(contacts) {
  return {
    type: types.GET_CONTACTS_SUCCESS,
    contacts: contacts
  };
}

export function getContactSuccess(contact) {
  return {
    type: types.GET_CONTACT_SUCCESS,
    contact: contact
  }
}

export function getContactNamesSuccess(contactnames) {
  return {
    type: types.GET_CONTACTNAMES_SUCCESS,
    contactnames: contactnames
  }
}
