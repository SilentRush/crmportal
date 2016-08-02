import React from "react";
import { Link } from "react-router";

export default class TicketDetail extends React.Component{
  constructor(props){
    super();
  }
  render(){
    const { subject, ticketid, slxcreatedate, createdate, slxupdatedate, updatedate, ticketproblem, ticketsolution, account, assignedto } = this.props.ticket;
    const url = "https://slxweb.sssworld.com/SlxClient/Ticket.aspx?entityid=" + ticketid;
    let Slxcreatedate = new Date(slxcreatedate);
    let Createdate = new Date(createdate);
    let Slxupdatedate = new Date(slxupdatedate);
    let Updatedate = new Date(updatedate);

    return (
      <div className="entityDetailContainer card-shadow">
        <div className="entityDetailHeader">{subject}</div>
        <div className="entityDetail">
          <label>Create on:</label><p>{Createdate.toLocaleString()}</p>
          <label>Updated on:</label><p>{Updatedate.toLocaleString()}</p>
          <label>Saleslogix Create Date:</label><p>{Slxcreatedate.toLocaleString()}</p>
          <label>Saleslogix Update Date:</label><p>{Slxupdatedate.toLocaleString()}</p>
          <label>Assigned To:</label><p>{assignedto.username}</p>
          <a href={url} target="blank">Infor Ticket Link:  {ticketid}</a><br />
          <label>Description:</label><p>{ticketproblem}</p>
          <label>Solution:</label><p>{ticketsolution}</p>
        </div>
      </div>
    )
  }
}
