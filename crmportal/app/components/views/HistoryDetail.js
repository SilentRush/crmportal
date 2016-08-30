import React from "react";
import {InputGroup, TextToInputGroup} from "../Utility/InputGroup";
import { Link, browserHistory } from "react-router";

export default class HistoryDetail extends React.Component{
  constructor(props){
    super();
  }
  render(){
    const { accountname, accountid, historyid, userid, username, notes, longnotes, description, descriptor, contactname, contactid, startdate, enddate, slxcreatedate } = this.props.history;
    const accurl = "https://slxweb.sssworld.com/SlxClient/Account.aspx?entityid=" + accountid;
    const conurl = "https://slxweb.sssworld.com/SlxClient/Contact.aspx?entityid=" + contactid;
    const NotesStyle = {whiteSpace: "pre-line", wordWrap: "break-word"};
    let Slxcreatedate = new Date(slxcreatedate);
    let Startdate = new Date(startdate);
    let Enddate = new Date(enddate);
    let isUser;
    if(userid != localStorage.userid)
      isUser = true;

    var saveBtn, delBtn;
    if(!isUser)
      saveBtn = <span className="glyphicon glyphicon-floppy-saved cursor" onClick={this.props.saveHistory}></span>;

    return (
      <div className="entityDetailContainer card-shadow">
        <div className="entityDetailHeader">
          <TextToInputGroup
              value={description}
              label={"Description"}
              onChange={(e)=>{this.props.changeValue("history.description",e.target.value)}}
              errors={this.props.errors.description}
          />
          <div style={{float:"right", fontSize:"18px"}}>{saveBtn}</div>
        </div>
        <div className="entityDetail">
          <div className="row">
            <div className="col-sm-6 col-xs-12 col-md-6">
              <InputGroup
                  label={"History Type:"}
                  value={descriptor}
                  showLabel={true}
                  readOnly={true}
              />
            </div>
            <div className="col-sm-6 col-xs-12 col-md-6">
              <InputGroup
                  label={"Created By:"}
                  value={username}
                  showLabel={true}
                  readOnly={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-xs-12 col-md-6">
              <a href={accurl} target="blank">
              <InputGroup
                  label={"Account:"}
                  value={accountname}
                  showLabel={true}
                  readOnly={true}
              />
              </a>
            </div>
            <div className="col-sm-6 col-xs-12 col-md-6">
              <a href={conurl} target="blank">
              <InputGroup
                  label={"Contact:"}
                  value={contactname}
                  showLabel={true}
                  readOnly={true}
              />
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4 col-xs-12 col-md-4">
              <InputGroup
                  label={"Start Date:"}
                  value={Startdate.toLocaleString()}
                  showLabel={true}
                  readOnly={true}
              />
            </div>
            <div className="col-sm-4 col-xs-12 col-md-4">
              <InputGroup
                  label={"End Date:"}
                  value={Enddate.toLocaleString()}
                  showLabel={true}
                  readOnly={true}
              />
            </div>
            <div className="col-sm-4 col-xs-12 col-md-4">
              <InputGroup
                  label={"Slx Create Date:"}
                  value={Slxcreatedate.toLocaleString()}
                  showLabel={true}
                  readOnly={true}
              />
            </div>
          </div>
          <InputGroup
              label={"Notes:"}
              value={longnotes}
              readOnly={isUser}
              showLabel={true}
              onChange={(e)=>{this.props.changeValue("history.longnotes",e.target.value)}}
              classes={"blockText"}
              useTextArea={true}
              rows={15}
          />
        </div>
      </div>
    )
  }
}
