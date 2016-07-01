import React from "react";
import { Link } from "react-router";

export default class TicketList extends React.Component{
  constructor(props){
    super();
  }
  createListItem(ticket){
    const { Subject, $key, TicketProblem, TicketSolution } = ticket;

    return (
      <div key={$key}>
        <h3><Link to={"tickets/" +$key}>{Subject}</Link></h3>
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
