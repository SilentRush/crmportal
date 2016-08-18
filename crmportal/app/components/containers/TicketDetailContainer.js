import React from "react";
import { connect } from 'react-redux';
import * as ticketApi from '../../api/ticket-api';
import * as accountApi from '../../api/account-api';
import TicketDetail from "../views/TicketDetail";
import AccountMiniDetail from "../views/AccountMiniDetail";
import CommentListContainer from "./CommentListContainer";
import CommentContainer from "./CommentContainer";
import {Entity} from 'draft-js';
import {ChangeValue} from "../Utility/InputUtilities";
import {addError,removeError} from "../Utility/ErrorUtilities";
import {NotificationManager} from 'react-notifications';

class TicketDetailContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showNotes: false,
      ticket: {
        account:{},
        assignedto:{
        }
      },
      errors:{}
    };
    this.clickShowNotes = this.clickShowNotes.bind(this);
    this.changeValue = (field,value) => {
      var state = this.state;
      state = ChangeValue(state,field,value);
      if(state)
        this.setState(state, this.isValid(()=>{
          //Validity Callback
        }));
      else {
        console.error("Unable to locate path: " + field + " in state.");
      }
    }
    this.isValid = (successCallback) => {
      let nextState = Object.assign({},this.state);
      nextState = Object.assign({}, this.validateSubject(nextState));
      this.setState(nextState,()=>{successCallback()});
    };

    this.saveTicket = () => {
      this.isValid(()=> {
        if(Object.keys(this.state.errors).length == 0){
          ticketApi.updateTicket(this.state.ticket).then(() => {
            NotificationManager.success('Save Successful','',2500);
          });
        }
      });
    }
  }

  validateSubject(state = 0){
    let nextState
    if(state)
      nextState = Object.assign({},state);
    else
      nextState = Object.assign({},this.state);
    if(!nextState.ticket.subject || nextState.ticket.subject == ""){
      nextState = Object.assign({}, addError(nextState,"Subject Missing", "subject"));
    }
    else{
      nextState = Object.assign({}, removeError(nextState,"Subject Missing", "subject"));
    }
    return nextState;
  }

  componentDidMount(){
    var data;
    let ticketId;
    if(this.props.params)
      ticketId = this.props.params.ticketid;
    ticketApi.getTicket(ticketId).then(
      () => {
        accountApi.getAccount(this.props.ticket.account.accountid);
      }
    ).then(()=>{
      this.commentList = <CommentListContainer entityid={this.props.ticket.ticketid} type={"ticket"} />;
      this.setState({ticket:this.props.ticket});
    });
  }

  clickShowNotes(){
    if(this.state.showNotes)
      this.setState({showNotes: false})
    else
      this.setState({showNotes: true});
  }

  render(){
    return (
      <div className="row">
        <div className="col-sm-3 col-xs-12 col-md-3">
          <AccountMiniDetail account={this.props.account} clickShowNotes={this.clickShowNotes} showNotes={this.state.showNotes} />
        </div>
        <div className="col-sm-9 col-xs-12 col-md-9">
          <TicketDetail ticket={this.state.ticket}
            changeValue={this.changeValue}
            saveTicket={this.saveTicket}
            errors={this.state.errors}
           />
          <div className="entityDetailContainer card-shadow">
            <div className="commentsHeader">Comments</div>
            <div className="entityDetail">
              {this.commentList}
              <CommentContainer isEdit={true} entityid={this.props.ticket.ticketid} type={"ticket"} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = function(store) {
  return {
    ticket: store.ticketState.ticket,
    account: store.accountState.account
  };
};

export default connect(mapStateToProps)(TicketDetailContainer);
