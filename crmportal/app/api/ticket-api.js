import axios from 'axios';
import store from '../store';
import instance from './connection-config'
import { getTicketsSuccess, getTicketSuccess } from '../actions/ticket-actions';

/**
 * Get all users
 */
 const API_ROOT = 'http://api.twilkislinux.sssworld-local.com/';

export function getTickets(from,size) {
  axios.defaults.baseURL = API_ROOT;
  return axios.get("/tickets?from=" + from + "&size=" + size)
    .then(function(response){
      let tickets = response.data.hits;
      store.dispatch(getTicketsSuccess(tickets));
    });
}


/**
 * Search users
 */

export function searchTickets(value,from,size) {
  axios.defaults.baseURL = API_ROOT;
  return axios({
    method: 'post',
    url: '/search/tickets',
    data: {
    "value":value,
    "from":from,
    "size":size
  }})
    .then(response => {
      let tickets = response.data.hits;
      store.dispatch(getTicketsSuccess(tickets));
    })
    .catch(error => {
      console.log(error);
    });
}

export function getAccountTickets(accountid,from,size) {
  axios.defaults.baseURL = API_ROOT;
  return axios.get('/search/tickets/account/'+ accountid + '?from=' + from + '&size=' + size)
    .then(response => {
      let tickets = response.data.hits;
      console.log(tickets);
      store.dispatch(getTicketsSuccess(tickets));
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
  axios.defaults.baseURL = API_ROOT;
  return axios.get("/tickets/" + ticketId).then(function(response){
    store.dispatch(getTicketSuccess(response.data._source));
  });
}
