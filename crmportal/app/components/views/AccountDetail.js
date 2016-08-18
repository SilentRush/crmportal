import React from "react";
import {InputGroup, TextToInputGroup} from "../Utility/InputGroup";
import { Link, browserHistory } from "react-router";

export default class AccountDetail extends React.Component{
  constructor(props){
    super();
  }
  render(){
    const { accountname, accountid, notes, address, userid } = this.props.account;
    const url = "https://slxweb.sssworld.com/SlxClient/Account.aspx?entityid=" + accountid;
    const NotesStyle = {whiteSpace: "pre-line", wordWrap: "break-word"};

    var saveBtn, delBtn;
    saveBtn = <span className="glyphicon glyphicon-floppy-saved cursor" onClick={this.props.saveAccount}></span>;

    return (
      <div className="entityDetailContainer card-shadow">
        <div className="entityDetailHeader">
          <TextToInputGroup
              value={accountname}
              label={"Account Name"}
              onChange={(e)=>{this.props.changeValue("account.accountname",e.target.value)}}
              errors={this.props.errors.accountname}
          />
          <div style={{float:"right", fontSize:"18px"}}>{saveBtn}</div>
        </div>
        <div className="entityDetail">
          <a href={url} target="blank">Infor Account Link:  {accountid}</a><br />
          <InputGroup
              label={"Street Address:"}
              value={address.streetaddress}
              showLabel={true}
              readOnly={true}
          />
          <InputGroup
              label={"City:"}
              value={address.city}
              showLabel={true}
              readOnly={true}
          />
          <InputGroup
              label={"Zip:"}
              value={address.zip}
              showLabel={true}
              readOnly={true}
          />
          <InputGroup
              label={"Notes:"}
              value={notes}
              showLabel={true}
              onChange={(e)=>{this.props.changeValue("account.notes",e.target.value)}}
              classes={"blockText"}
              useTextArea={true}
              rows={15}
          />
        </div>
      </div>
    )
  }
}
