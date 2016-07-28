import React from "react";
import {Entity} from 'draft-js';
import TicketInput from '../views/TicketInput';

export default class TicketInputContainer extends React.Component{
  constructor(props){
    super(props);
    this.onClick = () => this._onClick();
    this.handleSubmit = (e) => this._handleSubmit(e);
    this.state = {isActive:false};
  }

  _onClick (){
    if(this.state.isActive)
      this.setState({isActive:false});
    else
      this.setState({isActive:true});
  }

  _handleSubmit(e){
    var ticketid = document.getElementById("ticketid").value;
    this.props.ticketDetails(ticketid);
    this.setState({isActive:false});
  }

  componentDidMount(){
  }
  render(){
    return (
      <span>
          <TicketInput isActive={this.state.isActive} onClick={this.onClick} handleSubmit={this.handleSubmit} />
      </span>
    )
  }
}
