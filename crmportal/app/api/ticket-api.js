import axios from 'axios';
import store from '../store';
import { getTicketsSuccess, getTicketSuccess } from '../actions/ticket-actions';
import {encodeObjectToUriString} from '../components/Utility/AuthenticationWrapper';
import {apiBaseUrl} from './config';
import {Logout} from '../components/Utility/Logout';

axios.defaults.baseURL = apiBaseUrl;

/**
 * Get all users
 */

export function getTickets(from,size) {
  let params = {
    "from":from,
    "size":size,
    "userid":localStorage.userid,
    "token":localStorage.token
  };
  return axios({
    method: 'get',
    url: '/tickets' + encodeObjectToUriString(params)})
    .then(function(response){
      let tickets = response.data.hits;
      store.dispatch(getTicketsSuccess(tickets));
    })
    .catch(function(error){
      if(error.status == 401)
        Logout();
    });
}


export function updateTicket(ticket) {
  ticket.token = localStorage.token;
  ticket.userid = localStorage.userid;
  ticket.saleslogixAuth = localStorage.saleslogixAuth;
  return axios({
    method: 'put',
    url: '/tickets/' + ticket.ticketid,
    data: ticket})
    .then(response => {
      let ticket = response.data;
      //store.dispatch(addCommentSuccess(comment));
    })
    .catch(function(error){
      if(error.status == 401)
        Logout();
    });
}


/**
 * Search users
 */

export function searchTickets(value,from,size) {
  return axios({
    method: 'post',
    url: '/search/tickets',
    data: {
    "value":value,
    "from":from,
    "size":size,
    "userid":localStorage.userid,
    "token":localStorage.token
  }})
    .then(response => {
      let tickets = response.data.hits;
      store.dispatch(getTicketsSuccess(tickets));
    })
    .catch(function(error){
      if(error.status == 401)
        Logout();
    });
}

export function getAccountTickets(accountid,from,size) {
  let params = {
    "from": from,
    "size": size,
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url:'/search/ticket/account/' + accountid + encodeObjectToUriString(params)
  }).then(response => {
      let tickets = response.data.hits;
      store.dispatch(getTicketsSuccess(tickets));
    })
    .catch(function(error){
      if(error.status == 401)
        Logout();
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
    })
    .catch(function(error){
      if(error.status == 401)
        Logout();
    });
}

/**
 * getProfile() is much more complex because it has to make
 * three XHR requests to get all the profile info.
 */

export function getTicket(ticketId) {
  let params = {
    "token": localStorage.token,
    "userid": localStorage.userid
  };
  return axios({
    method: 'get',
    url:'/tickets/' + ticketId + encodeObjectToUriString(params)
  }).then(function(response){
    store.dispatch(getTicketSuccess(response.data._source));
  })
  .catch(function(error){
    if(error.status == 401)
      Logout();
  });
}
