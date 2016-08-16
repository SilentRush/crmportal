import React from "react";
import {InputGroup, TextToInputGroup} from "../Utility/InputGroup";

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
        <div className="entityDetailHeader">
          <TextToInputGroup
              value={accountname}
              label={"Account Name"}
              onChange={this.props.changeAccount}
          />
        </div>
        <div className="entityDetail">
          <a href={url} target="blank">Infor Account Link:  {accountid}</a><br />
          <InputGroup
              label={"Street Address:"}
              value={address.streetaddress}
              showLabel={true}
              onChange={this.props.changeStreetAddress}
          />
          <InputGroup
              label={"City:"}
              value={address.city}
              showLabel={true}
              onChange={this.props.changeCity}
          />
          <InputGroup
              label={"Zip:"}
              value={address.zip}
              showLabel={true}
              onChange={this.props.changeZip}
          />
          <InputGroup
              label={"Notes:"}
              value={notes}
              showLabel={true}
              onChange={this.props.changeNotes}
              classes={"blockText"}
              useTextArea={true}
          />
        </div>
      </div>
    )
  }
}
