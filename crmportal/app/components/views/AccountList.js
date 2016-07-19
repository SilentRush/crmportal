import React from "react";
import { Link } from "react-router";

export default class AccountList extends React.Component{
  constructor(props){
    super();
  }
  createListItem(account){
    console.log(account);
    const { accountname, accountid, notes, address } = account._source;

    return (
      <div key={accountid} className="ticketListContainer">
        <div className="ticketListItem">
          <div><Link to={"accounts/" +accountid}>{accountname}</Link></div>
          <div>{address.streetaddress}</div>
        </div>
      </div>
    )
  }
  render(){
    return(
      <div>
        {this.props.accounts.map(this.createListItem)}
      </div>
    )
  }
}
