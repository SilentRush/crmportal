import React from "react";
import { Link } from "react-router";

export default class AccountList extends React.Component{
  constructor(props){
    super(props);
  }
  createListItem(account){
    const { accountname, accountid, notes, address } = account._source;
    const { highlight } = account;
    var acc;

    if(highlight){
      acc = highlight.accountname.join('');
      acc = <span dangerouslySetInnerHTML={{__html: acc}}></span>
    }
    else{
      acc = accountname;
    }


    return (
      <div key={accountid} className="ticketListContainer">
        <div className="ticketListItem">
          <div><Link to={"/account/" +accountid}>{acc}</Link></div>
          <div>{address.streetaddress}</div>
        </div>
      </div>
    )
  }
  render(){
    return(
      <div>
        {this.props.accounts.hits.map(this.createListItem)}
      </div>
    )
  }
}
