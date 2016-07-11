import React from "react";

export default class AccountMiniDetail extends React.Component{
  constructor(props){
    super();
  }
  render(){
    const { $key, AccountName } = this.props.account;

    return (
      <div className="ticketDetailContainer card-shadow">
        <p>{$key}</p>
        <p>{AccountName}</p>
      </div>
    )
  }
}
