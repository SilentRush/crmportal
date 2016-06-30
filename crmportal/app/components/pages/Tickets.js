import React from "react";
import Ticket from "../tickets/Ticket";

export default class Tickets extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data:[]
    };
  }
  componentDidMount(){
    this.serverRequest = $.get("../TempJs/tickets.json",function(data){
        this.setState({data: data.$resources});
      }.bind(this));
  }
  componentWillUnmount(){
    this.serverRequest.abort();
  }
  render(){
    return (
      <div>
        {this.state.data.map(function(ticket, index){
          return <Ticket ticket={ticket} key={index} />
        })}
      </div>
    )
  }
}
