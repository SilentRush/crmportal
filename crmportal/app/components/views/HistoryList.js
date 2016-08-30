import React from "react";
import { Link } from "react-router";

export default class HistoryList extends React.Component{
  constructor(props){
    super(props);
  }
  createListItem(history){
    const { accountname, accountid, historyid, userid, username, notes, longnotes, description, descriptor, contactname, contactid, startdate, enddate, slxcreatedate } = history._source;
    const { highlight } = history;
    let Slxcreatedate = new Date(slxcreatedate);
    let Startdate = new Date(startdate);
    let Enddate = new Date(enddate);
    var Description,Notes,Contactname,Accountname,Username;

    (highlight && highlight.description) ? Description = highlight.description.join('') : Description = description;
    (highlight && highlight.longnotes) ? Notes = highlight.longnotes.join('') : Notes = longnotes;
    (highlight && highlight.contactname) ? Contactname = highlight.contactname.join('') : Contactname = contactname;
    (highlight && highlight.accountname) ? Accountname = highlight.accountname.join('') : Accountname = accountname;
    (highlight && highlight.username) ? Username = highlight.username.join('') : Username = username;

    if(Notes) Notes = Notes.substring(0,500) + "...";
    Description = <span dangerouslySetInnerHTML={{__html: Description}}></span>
    Notes = <span dangerouslySetInnerHTML={{__html: Notes}}></span>
    Contactname = <span dangerouslySetInnerHTML={{__html: Contactname}}></span>
    Accountname = <span dangerouslySetInnerHTML={{__html: Accountname}}></span>
    Username = <span dangerouslySetInnerHTML={{__html: Username}}></span>

    return (
      <div key={historyid} className="ticketListContainer">
        <div className="ticketListItem">
          <div><Link to={"/history/" +historyid}>{Description}</Link></div>
          <div>Account: {Accountname}</div>
          <div>Contact: {Contactname}</div>
          <div>Notes:{Notes}</div>
          <div>Start Date: {Startdate.toLocaleString()} - End Date: {Enddate.toLocaleString()}</div>
          <div>Type: {descriptor} - Owner: {Username}</div>
        </div>
      </div>
    )
  }
  render(){
    return(
      <div>
        {this.props.histories.hits.map(this.createListItem)}
      </div>
    )
  }
}
