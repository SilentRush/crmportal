import React from "react";
import axios from "axios";
import TicketDetail from "./TicketDetail";

export default class TicketDetailContainer extends React.Component{
  constructor(props){
    super();
    this.state = {
      ticket:{}
    };
  }
  componentDidMount(){
    this.serverRequest = axios.get("../TempJs/tickets.json").then(function(response){
        let ticket = $.grep(response.data.$resources, function(e){
          return e.$key == this.props.params.ticketid;
        }.bind(this));
        this.setState({ticket: ticket[0]});
      }.bind(this));
  }
  getComponent(){
    if(this.state.ticket.$key){
      return(
        <TicketDetail ticket={this.state.ticket} />
      )
    }
    else {
      return(
        <h1>loading</h1>
      )
    }
  }

  render(){
    return (
      <div>
        {this.getComponent()}
      </div>
    )
  }
}
