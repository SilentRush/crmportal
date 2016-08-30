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
    const { highlight } = ticket;
    var Subject,TicketProblem,TicketSolution;

    (highlight && highlight.subject) ? Subject = highlight.subject.join('') : Subject = subject;
    (highlight && highlight.ticketproblem) ? TicketProblem = highlight.ticketproblem.join('') : TicketProblem = ticketproblem;
    (highlight && highlight.ticketsolution) ? TicketSolution = highlight.ticketsolution.join('') : TicketSolution = ticketsolution;

    if(TicketSolution) TicketSolution = TicketSolution.substring(0,300) + "...";
    if(TicketProblem) TicketProblem = TicketProblem.substring(0,300) + "...";
    TicketSolution = <span dangerouslySetInnerHTML={{__html: TicketSolution}}></span>
    TicketProblem = <span dangerouslySetInnerHTML={{__html: TicketProblem}}></span>
    Subject = <span dangerouslySetInnerHTML={{__html: Subject}}></span>


    return (
      <div key={ticketid} className="ticketListContainer">
        <div className="ticketListItem">
          <div><Link to={"/ticket/" +ticketid}>{ticketid} - {Subject}</Link></div>
          <div>{account.accountname}</div>
          <div>Create Date: {Slxcreatedate.toLocaleString()} - Update Date: {Slxupdatedate.toLocaleString()}</div>
          <div>Problem: {TicketProblem}</div>
          <div>Solution: {TicketSolution}</div>
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
