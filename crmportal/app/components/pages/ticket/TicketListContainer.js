import React from "react";
import axios from "axios";
import TicketList from "./TicketList";

export default class TicketListContainer extends React.Component{
  constructor(props){
    super();
    this.state = {
      tickets:[]
    };
  }
  componentDidMount(){
    this.serverRequest = axios.get("../TempJs/tickets.json").then(function(response){
        this.setState({tickets: response.data.$resources});
      }.bind(this));
  }

  render(){
    return (
      <TicketList tickets={this.state.tickets} />
    )
  }
}
