import React from "react";
import { Link } from "react-router";

export default class ContactList extends React.Component{
  constructor(props){
    super(props);
  }
  createListItem(contact){
    const { contactname, contactid, accountname} = contact._source;
    const { highlight } = contact;
    var con,acc;

    if(highlight){
      if(highlight.accountname){
        acc = highlight.accountname.join('');
        acc = <span dangerouslySetInnerHTML={{__html: acc}}></span>
      }
      else{
        acc = accountname;
      }
      if(highlight.contactname){
        con = highlight.contactname.join('');
        con = <span dangerouslySetInnerHTML={{__html: con}}></span>
      }
      else{
        con = contactname;
      }
    }
    else{
      acc = accountname;
      con = contactname;
    }


    return (
      <div key={contactid} className="ticketListContainer">
        <div className="ticketListItem">
          <div><Link to={"/contact/" +contactid}>{con}</Link></div>
          <div>Account: {acc}</div>
        </div>
      </div>
    )
  }
  render(){
    return(
      <div>
        {this.props.contacts.hits.map(this.createListItem)}
      </div>
    )
  }
}
