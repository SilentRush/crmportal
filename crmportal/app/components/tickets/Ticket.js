import React from "react";

export default class Ticket extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <h3>{this.props.ticket.Subject}</h3>
        <label>Id:</label><p>{this.props.ticket.$key}</p>
        <label>Description:</label><p>{this.props.ticket.TicketProblem.Notes}</p>
        <label>Solution:</label><p>{this.props.ticket.TicketSolution.Notes}</p>
      </div>
    )
  }
}
