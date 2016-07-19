import React from "react";
import { Link } from "react-router";

export default class AccountMiniDetail extends React.Component{
  constructor(props){
    super();
  }
  render(){
    const { accountid, accountname, notes } = this.props.account;
    const hrStyle = {marginRight: "10px", marginLeft: "10px"};
    const NotesStyle = {whiteSpace: "pre-line", wordWrap: "break-word"};
    const url = "https://slxweb.sssworld.com/SlxClient/Account.aspx?entityid=" + accountid;
    let notesDiv,button;

    if(this.props.showNotes){
      notesDiv = <p style={NotesStyle}>{notes}</p>;
      button = <span className="glyphicon glyphicon-minus-sign floatRight"></span>;
    }
    else {
      //notes = <p style={NotesStyle}></p>
      button = <span className="glyphicon glyphicon-plus-sign floatRight"></span>;
    }

    return (
      <div className="AccountMiniDetailContainer card-shadow">
        <h4 className="AccountMiniDetail-Header"><Link to={"accounts/" + accountid}>{accountname}</Link></h4>
        <div className="AccountMiniDetail-Img">
          <img src="http://www.teradata.com/uploadedImages/At-A-Glance/Our-Partners/XTIVIA_logo.png" />
        </div>
        <hr style={hrStyle} />
        <div className="AccountDetail">
          <a href={url} target="blank">Infor Account Link:  {accountname}</a>
          <div className="stickynotes">
            <div className="DivCursor NotesTab" onClick={this.props.clickShowNotes}>
              <span>Notes</span>
              {button}
            </div>
            {notesDiv}
          </div>
        </div>
      </div>
    )
  }
}
