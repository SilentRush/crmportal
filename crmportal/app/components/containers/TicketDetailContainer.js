import React from "react";
import { connect } from 'react-redux';
import * as ticketApi from '../../api/ticket-api';
import TicketDetail from "../views/TicketDetail";

class TicketDetailContainer extends React.Component{

  componentDidMount(){
      let ticketId = this.props.params.ticketid;
      ticketApi.getTicket(ticketId);
  }
  getComponent(){

  }

  render(){
    return (
      <div>
        <TicketDetail ticket={this.props.ticket} />
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    ticket: store.ticketState.ticket
  };
};

export default connect(mapStateToProps)(TicketDetailContainer);
