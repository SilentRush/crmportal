import React from "react";
import { Link } from "react-router";

export default class AccountList extends React.Component{
  constructor(props){
    super(props);
  }
  createListItem(account){
    const { accountname, accountid, notes, address } = account._source;

    return (
      <div key={accountid} className="ticketListContainer">
        <div className="ticketListItem">
          <div><Link to={"/account/" +accountid}>{accountname}</Link></div>
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
