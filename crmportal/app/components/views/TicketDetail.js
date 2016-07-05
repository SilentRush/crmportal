import React from "react";

export default class TicketDetail extends React.Component{
  constructor(props){
    super();
  }
  render(){
    const { Subject, $key, TicketProblem, TicketSolution } = this.props.ticket;

    return (
      <div>
        <h3>{Subject}</h3>
        <label>Id:</label><p>{$key}</p>
        <label>Description:</label><p>{TicketProblem.Notes}</p>
        <label>Solution:</label><p>{TicketSolution.Notes}</p>
      </div>
    )
  }
}
