import React from "react";
import { Link } from "react-router";

export default class TicketMiniList extends React.Component{
  constructor(props){
    super();
  }
  createListItem(ticket){
    const { subject, ticketid, ticketproblem, ticketsolution, account } = ticket._source;

    return (
      <div key={ticketid} className="ticketListMini">
          <div><Link to={"/ticket/" +ticketid}>{ticketid} - {subject}</Link></div>
      </div>
    )
  }
  createPage(pageCount){
    var rows = [];
    for(let i = 0; i < pageCount; i++){
      if(this.props.currentIndex == i)
        rows.push(<li key={i} className="active"><a onClick={() => this.props.clickPage(i)}>{i+1}</a></li>);
      else
        rows.push(<li key={i}><a onClick={() => this.props.clickPage(i)}>{i+1}</a></li>);
    }
    return rows;
  }

  render(){
    const hrStyle = {marginRight: "10px", marginLeft: "10px", marginTop: "0px", marginBottom: "0px"};
    const ticketListContainer = {maxHeight:"650px",overflow:"auto"};
    if(this.props.tickets.total)
      var pageCount = Math.ceil(this.props.tickets.total / 15);
    else
      var pageCount = 0;
    console.log(this.props.tickets.hits);

    return(
      <div className="AccountMiniDetailContainer card-shadow">
        <h4 className="AccountMiniDetail-Header">Tickets</h4>
        <hr style={hrStyle} />
        <div className="AccountDetail">
          <div style={ticketListContainer}>
          {this.props.tickets.hits.map(this.createListItem)}
          </div>
          <ul className="pagination pagination-sm">
            {this.createPage(pageCount)}
          </ul>
        </div>

      </div>
    )
  }
}
