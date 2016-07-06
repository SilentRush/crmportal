import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  tickets: [],
  ticket: {
    TicketProblem:{},
    TicketSolution:{},
    Account:{}
  }
};

const ticketReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_TICKETS_SUCCESS:
      return Object.assign({}, state, { tickets: action.tickets });

    case types.GET_TICKET_SUCCESS:
      return Object.assign({}, state, { ticket: action.ticket });

  }

  return state;

}

export default ticketReducer;
