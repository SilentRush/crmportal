import React from "react";
import { Link } from "react-router";
import {InputGroup, TextToInputGroup} from "../Utility/InputGroup";

export default class TicketDetail extends React.Component{
  constructor(props){
    super();
  }
  render(){
    const { subject, ticketid, slxcreatedate, createdate, slxupdatedate, updatedate, ticketproblem, ticketsolution, account, assignedto } = this.props.ticket;
    const url = "https://slxweb.sssworld.com/SlxClient/Ticket.aspx?entityid=" + ticketid;
    let Slxcreatedate = new Date(slxcreatedate);
    let Createdate = new Date(createdate);
    let Slxupdatedate = new Date(slxupdatedate);
    let Updatedate = new Date(updatedate);

    var saveBtn, delBtn;
    saveBtn = <span className="glyphicon glyphicon-floppy-saved cursor" onClick={this.props.saveTicket}></span>;

    return (
      <div className="entityDetailContainer card-shadow">
        <div className="entityDetailHeader">
          <TextToInputGroup
              value={subject}
              label={"Subject"}
              onChange={(e)=>{this.props.changeValue("ticket.subject",e.target.value)}}
              errors={this.props.errors.subject}
          />
          <div style={{float:"right", fontSize:"18px"}}>{saveBtn}</div>
        </div>
        <div className="entityDetail">
          <div className="row">
            <div className="col-sm-6 col-xs-12 col-md-6">
              <InputGroup
                  label={"Create on:"}
                  value={Createdate.toLocaleString()}
                  showLabel={true}
                  readOnly={true}
              />
            </div>
            <div className="col-sm-6 col-xs-12 col-md-6">
              <InputGroup
                  label={"Updated on:"}
                  value={Updatedate.toLocaleString()}
                  showLabel={true}
                  readOnly={true}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 col-xs-12 col-md-6">
              <InputGroup
                  label={"Saleslogix Create Date:"}
                  value={Slxcreatedate.toLocaleString()}
                  showLabel={true}
                  readOnly={true}
              />
            </div>
            <div className="col-sm-6 col-xs-12 col-md-6">
              <InputGroup
                  label={"Saleslogix Update Date:"}
                  value={Slxupdatedate.toLocaleString()}
                  showLabel={true}
                  readOnly={true}
              />
            </div>
          </div>
          <InputGroup
              label={"Assigned To:"}
              value={assignedto.username}
              showLabel={true}
              readOnly={true}
          />
          <a href={url} target="blank">Infor Ticket Link:  {ticketid}</a><br />
          <InputGroup
              label={"Description:"}
              value={ticketproblem}
              showLabel={true}
              onChange={(e)=>{this.props.changeValue("ticket.ticketproblem",e.target.value)}}
              classes={"blockText"}
              useTextArea={true}
              rows={10}
          />
          <InputGroup
              label={"Solution:"}
              value={ticketsolution}
              showLabel={true}
              onChange={(e)=>{this.props.changeValue("ticket.ticketsolution",e.target.value)}}
              classes={"blockText"}
              useTextArea={true}
              rows={10}
          />
        </div>
      </div>
    )
  }
}
