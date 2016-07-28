import React from "react";
import { connect } from 'react-redux';
import * as ticketApi from '../../../../api/ticket-api';
import * as accountApi from '../../../../api/account-api';
import TicketDetail from "../views/TicketDetail";
import {Entity} from 'draft-js';

class TicketDetailContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {showNotes: false};
    this.clickShowNotes = this.clickShowNotes.bind(this);
  }

  componentDidMount(){
    var data;
    if(this.props.block)
      data = Entity.get(this.props.block.getEntityAt(0)).getData();
    let ticketId;
    if(this.props.params)
      ticketId = this.props.params.ticketid;
    if(this.props.ticketid)
      ticketId = this.props.ticketid;
    ticketApi.getTicket(ticketId).then(
      () => {
        accountApi.getAccount(this.props.ticket.account.accountid);
        console.log(this.props);
      }
    );
  }

  clickShowNotes(){
    if(this.state.showNotes)
      this.setState({showNotes: false})
    else
      this.setState({showNotes: true});
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
    ticket: store.ticketState.ticket,
    account: store.accountState.account
  };
};

export default connect(mapStateToProps)(TicketDetailContainer);
