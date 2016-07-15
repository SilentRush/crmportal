import React from "react";

export default class AccountMiniDetail extends React.Component{
  constructor(props){
    super();
  }
  render(){
    const { $key, AccountName, Notes } = this.props.account;
    const hrStyle = {marginRight: "10px", marginLeft: "10px"};
    const NotesStyle = {whiteSpace: "pre-line", wordWrap: "break-word"};
    const url = "https://slxweb.sssworld.com/SlxClient/Account.aspx?entityid=" + $key;
    let notes,button;

    if(this.props.showNotes){
      notes = <p style={NotesStyle}>{Notes}</p>;
      button = <span className="glyphicon glyphicon-minus-sign floatRight"></span>;
    }
    else {
      //notes = <p style={NotesStyle}></p>
      button = <span className="glyphicon glyphicon-plus-sign floatRight"></span>;
    }

    return (
      <div className="AccountMiniDetailContainer card-shadow">
        <h4 className="AccountMiniDetail-Header">{AccountName}</h4>
        <div className="AccountMiniDetail-Img">
          <img src="http://www.teradata.com/uploadedImages/At-A-Glance/Our-Partners/XTIVIA_logo.png" />
        </div>
        <hr style={hrStyle} />
        <div className="AccountDetail">
          <a href={url} target="blank">Infor Account Link:  {AccountName}</a>
          <div className="stickynotes">
            <div className="DivCursor NotesTab" onClick={this.props.clickShowNotes}>
              <span>Notes</span>
              {button}
            </div>
            {notes}
          </div>
        </div>
      </div>
    )
  }
}
