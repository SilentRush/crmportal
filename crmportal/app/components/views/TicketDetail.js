import React from "react";

export default class TicketDetail extends React.Component{
  constructor(props){
    super();
  }
  render(){
    const { Subject, $key, Createdate, TicketProblem, TicketSolution, Account, AssignedTo } = this.props.ticket;
    const url = "https://slxweb.sssworld.com/SlxClient/Ticket.aspx?entityid=" + $key;
    let d = Date(Createdate);

    return (
      <div className="ticketDetailContainer card-shadow">
        <div className="ticketDetailHeader">{Subject}</div>
        <div className="ticketDetail">
          <label>Create Date:</label><p>{d}</p>
          <label>Assigned To:</label><p>{AssignedTo.User.UserInfo.FirstName + " " + AssignedTo.User.UserInfo.LastName}</p>
          <a href={url} target="blank">Infor Ticket Link:  {$key}</a><br />
          <label>Description:</label><p>{TicketProblem.Notes}</p>
          <label>Solution:</label><p>{TicketSolution.Notes}</p>
        </div>
      </div>
    )
  }
}
