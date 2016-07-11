import React from "react";

export default class TicketDetail extends React.Component{
  constructor(props){
    super();
  }
  render(){
    const { Subject, $key, TicketProblem, TicketSolution, Account } = this.props.ticket;

    return (
      <div className="ticketDetailContainer card-shadow">
        <div className="ticketDetailHeader">{Subject}</div>
        <div className="ticketDetail">
          <label>Id:</label><p>{$key}</p>
          <label>Description:</label><p>{TicketProblem.Notes}</p>
          <label>Solution:</label><p>{TicketSolution.Notes}</p>
        </div>
      </div>
    )
  }
}
