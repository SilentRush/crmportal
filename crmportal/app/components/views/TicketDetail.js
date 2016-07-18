import React from "react";

export default class TicketDetail extends React.Component{
  constructor(props){
    super();
  }
  render(){
    const { subject, ticketid, createdate, ticketproblem, ticketsolution, account, assignedto } = this.props.ticket;
    const url = "https://slxweb.sssworld.com/SlxClient/Ticket.aspx?entityid=" + ticketid;
    let d = Date(createdate);

    return (
      <div className="ticketDetailContainer card-shadow">
        <div className="ticketDetailHeader">{subject}</div>
        <div className="ticketDetail">
          <label>Create Date:</label><p>{d}</p>
          <label>Assigned To:</label><p>{assignedto.username}</p>
          <a href={url} target="blank">Infor Ticket Link:  {ticketid}</a><br />
          <label>Description:</label><p>{ticketproblem}</p>
          <label>Solution:</label><p>{ticketsolution}</p>
        </div>
      </div>
    )
  }
}
