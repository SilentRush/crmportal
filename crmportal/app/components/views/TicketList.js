import React from "react";
import { Link } from "react-router";

export default class TicketList extends React.Component{
  constructor(props){
    super();
  }
  createListItem(ticket){
    const { Subject, $key, TicketProblem, TicketSolution, Account } = ticket;

    return (
      <div key={$key} className="ticketListContainer">
        <div className="ticketListItem">
          <div><Link to={"tickets/" +$key}>{Subject}</Link></div>
          <div>{Account.AccountName}</div>
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
