import React from "react";
import { connect } from 'react-redux';
import * as ticketApi from '../../api/ticket-api';
import TicketDetail from "../views/TicketDetail";
import AccountMiniDetail from "../views/AccountMiniDetail";

class TicketDetailContainer extends React.Component{

  componentDidMount(){
      let ticketId = this.props.params.ticketid;
      ticketApi.getTicket(ticketId);
  }
  getComponent(){

  }

  render(){
    return (
      <div className="row">
        <div className="col-sm-4 col-xs-12 col-md-4">
          <AccountMiniDetail account={this.props.ticket.Account} />
        </div>
        <div className="col-sm-8 col-xs-12 col-md-8">
          <TicketDetail ticket={this.props.ticket} />
        </div>
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
