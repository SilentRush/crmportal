import * as types from '../actions/action-types';

export function getTicketsSuccess(tickets) {
  return {
    type: types.GET_TICKETS_SUCCESS,
    tickets
  };
}

export function getTicketSuccess(ticket) {
  return {
    type: types.GET_TICKET_SUCCESS,
    ticket
  };
}
