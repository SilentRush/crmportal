import React from "react";
import { Link } from "react-router";

export default class TicketList extends React.Component{
  constructor(props){
    super();
  }
  createListItem(ticket){
    const { subject, ticketid, ticketproblem, ticketsolution, account } = ticket._source;

    return (
      <div key={ticketid} className="ticketListContainer">
        <div className="ticketListItem">
          <div><Link to={"tickets/" +ticketid}>{subject}</Link></div>
          <div>{account.accountname}</div>
        </div>
      </div>
    )
  }
  render(){
    return(
      <div>
        {this.props.tickets.map(this.createListItem)}
      </div>
    )
  }
}
