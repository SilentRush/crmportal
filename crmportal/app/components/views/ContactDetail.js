import React from "react";
import {InputGroup, TextToInputGroup} from "../Utility/InputGroup";
import { Link, browserHistory } from "react-router";

export default class ContactDetail extends React.Component{
  constructor(props){
    super();
  }
  render(){
    const { contactname, contactid, userid, fullname, accountname, accountid } = this.props.contact;
    const url = "https://slxweb.sssworld.com/SlxClient/Contact.aspx?entityid=" + contactid;
    const NotesStyle = {whiteSpace: "pre-line", wordWrap: "break-word"};

    var saveBtn, delBtn;
    saveBtn = <span className="glyphicon glyphicon-floppy-saved cursor" onClick={this.props.saveContact}></span>;

    return (
      <div className="entityDetailContainer card-shadow">
        <div className="entityDetailHeader">
          <TextToInputGroup
              value={contactname}
              label={"Contact Name"}
              onChange={(e)=>{this.props.changeValue("contact.contactname",e.target.value)}}
              errors={this.props.errors.contactname}
          />
          <div style={{float:"right", fontSize:"18px"}}>{saveBtn}</div>
        </div>
        <div className="entityDetail">
          <a href={url} target="blank">Infor Contact Link:  {contactid}</a><br />
          <InputGroup
              label={"Fullname:"}
              value={fullname}
              showLabel={true}
              readOnly={true}
          />
          <Link to={"/account/" + accountid}>
            <InputGroup
                label={"Account:"}
                value={accountname}
                showLabel={true}
                readOnly={true}
            />
          </Link>
        </div>
      </div>
    )
  }
}
