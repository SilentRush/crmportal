import React from "react";
import { connect } from 'react-redux';
import * as ticketApi from '../../api/ticket-api';
import store from '../../store';
import TicketList from "../views/TicketList";
import { loadSearchLayout } from '../../actions/search-layout-actions';

class TicketListContainer extends React.Component{
  componentDidMount(){
    ticketApi.getTickets();
    store.dispatch(loadSearchLayout('tickets', 'Ticket Results'));
  }

  render(){
    return (
      <TicketList tickets={this.props.tickets} />
    )
  }
}

const mapStateToProps = function(store) {
  return {
    tickets: store.ticketState.tickets
  };
};

export default connect(mapStateToProps)(TicketListContainer);
