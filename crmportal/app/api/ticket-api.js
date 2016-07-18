import axios from 'axios';
import store from '../store';
import instance from './connection-config'
import { getTicketsSuccess, getTicketSuccess } from '../actions/ticket-actions';

/**
 * Get all users
 */

export function getTickets() {
  axios.defaults.baseURL = 'http://api.twilkislinux.sssworld-local.com/';
  return axios.get("/tickets")
    .then(function(response){
      store.dispatch(getTicketsSuccess(response.data.hits.hits));
    });
}


/**
 * Search users
 */

export function searchTickets(query = '') {
  return axios.get('http://localhost:3001/users?q='+ query)
    .then(response => {
      store.dispatch(getTicketsSuccess(response.data));
      return response;
    });
}

/**
 * Delete a user
 */

export function deleteUser(userId) {
  return axios.delete('http://localhost:3001/users/' + userId)
    .then(response => {
      store.dispatch(deleteUserSuccess(userId));
      return response;
    });
}

/**
 * getProfile() is much more complex because it has to make
 * three XHR requests to get all the profile info.
 */

export function getTicket(ticketId) {
  axios.defaults.baseURL = 'http://api.twilkislinux.sssworld-local.com/';
  return axios.get("/tickets/" + ticketId).then(function(response){
    console.log(response);
    store.dispatch(getTicketSuccess(response.data._source));
  });
}
