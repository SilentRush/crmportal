import React from "react";
import { Link } from "react-router";

export default class TicketList extends React.Component{
  constructor(props){
    super();
  }
  createListItem(ticket){
    const { subject, ticketid, ticketproblem, ticketsolution, account,slxcreatedate, createdate, slxupdatedate, updatedate } = ticket._source;
    let Slxcreatedate = new Date(slxcreatedate);
    let Createdate = new Date(createdate);
    let Slxupdatedate = new Date(slxupdatedate);
    let Updatedate = new Date(updatedate);

    if(!subject)
      var Subject = ticketid;
    else
      var Subject = subject;
    return (
      <div key={ticketid} className="ticketListContainer">
        <div className="ticketListItem">
          <div><Link to={"tickets/" +ticketid}>{Subject}</Link></div>
          <div>{account.accountname}</div>
          <div>Create Date: {Slxcreatedate.toLocaleString()} - Update Date: {Slxupdatedate.toLocaleString()}</div>
        </div>
      </div>
    )
  }
  render(){
    return(
      <div>
        {this.props.tickets.hits.map(this.createListItem)}
      </div>
    )
  }
}
