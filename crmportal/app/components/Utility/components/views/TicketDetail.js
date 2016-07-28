import React from "react";
import { Link } from "react-router";

export default class TicketDetail extends React.Component{
  constructor(props){
    super();
    this.state = {isActive:false};
    this.mouseEnter = () => {
        this.setState({isActive:true})
    };
    this.mouseLeave = () => {
        this.setState({isActive:false});
    };
  }
  render(){
    const { subject, ticketid, slxcreatedate, createdate, slxupdatedate, updatedate, ticketproblem, ticketsolution, account, assignedto } = this.props.ticket;
    const url = "https://slxweb.sssworld.com/SlxClient/Ticket.aspx?entityid=" + ticketid;
    const style = {maxWidth:"500px"};
    let Slxcreatedate = new Date(slxcreatedate);
    let Createdate = new Date(createdate);
    let Slxupdatedate = new Date(slxupdatedate);
    let Updatedate = new Date(updatedate);

    var details;
    if(this.state.isActive){
        details =
        <div className="uiContextualLayerPositioner">
          <div className="ticketDetailContainer card-shadow" style={style}>
            <div className="ticketDetailHeader">{subject}</div>
            <div className="ticketDetail">
              <label>Saleslogix Create Date:</label><p>{Slxcreatedate.toLocaleString()}</p>
              <label>Saleslogix Update Date:</label><p>{Slxupdatedate.toLocaleString()}</p>
              <label>Assigned To:</label><p>{assignedto.username}</p>
              <label>Description:</label><p>{ticketproblem}</p>
            </div>
          </div>
        </div>;
    }
    else {
      details = '';
    }

    return (
      <div>
        <span onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}><Link to={"tickets/" +ticketid}>{ticketid} - {subject}</Link></span>
        {details}
      </div>
    )
  }
}
