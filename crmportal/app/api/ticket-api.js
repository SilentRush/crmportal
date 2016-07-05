import axios from 'axios';
import store from '../store';
import { getTicketsSuccess, getTicketSuccess } from '../actions/ticket-actions';

/**
 * Get all users
 */

export function getTickets() {
  return axios.get("../TempJs/tickets.json")
    .then(function(response){
      store.dispatch(getTicketsSuccess(response.data.$resources));
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
  return axios.get("../TempJs/tickets.json").then(function(response){
    let ticket = $.grep(response.data.$resources, function(e){
        return e.$key == ticketId;
    });
    store.dispatch(getTicketSuccess(ticket[0]));
  });
}
