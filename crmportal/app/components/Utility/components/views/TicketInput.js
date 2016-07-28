import React from "react";
import { Link } from "react-router";

export default class TicketInput extends React.Component{
  constructor(props){
    super();
  }
  render(){
    var output, activeClass;
    if(this.props.isActive){
      activeClass = "RichEditor-activeButton";
      output = <form className="form-inline"><div className="form-group"><input type="text" className="form-control" placeholder="Ticket Id" id="ticketid" /><input type="button" className="btn btn-primary" onClick={this.props.handleSubmit} value="Submit" /></div></form>;
    }
    else{
      activeClass = "";
      output = '';
    }

    return (
      <span>
        <span className={"RichEditor-styleButton " + activeClass} onClick={this.props.onClick}>Add Ticket Details</span>
        <div className="uiContextualLayerPositioner">
          {output}
        </div>
      </span>
    )
  }
}
