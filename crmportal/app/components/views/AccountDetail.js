import React from "react";

export default class AccountDetail extends React.Component{
  constructor(props){
    super();
  }
  render(){
    const { accountname, accountid, notes, address } = this.props.account;
    const url = "https://slxweb.sssworld.com/SlxClient/Account.aspx?entityid=" + accountid;
    const NotesStyle = {whiteSpace: "pre-line", wordWrap: "break-word"};

    return (
      <div className="entityDetailContainer card-shadow">
        <div className="entityDetailHeader">{accountname}</div>
        <div className="entityDetail">
          <a href={url} target="blank">Infor Account Link:  {accountid}</a><br />
          <label>Street Address:</label><p>{address.streetaddress}</p>
          <label>City:</label><p>{address.city}</p>
          <label>State:</label><p>{address.state}</p>
          <label>Zip:</label><p>{address.zip}</p>
          <label>Notes:</label><p style={NotesStyle}>{notes}</p>
        </div>
      </div>
    )
  }
}
